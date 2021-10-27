#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e

######## VARIABLES #########
# For better maintainability, we store as much information that can change in variables
# This allows us to make a change in one place that can propagate to all instances of the variable
# These variables should all be GLOBAL variables, written in CAPS
# Local variables will be in lowercase and will exist only within functions

### PATHS ###
HOME_DIRECTORY="/home/pi"
PROJECT_DIRECTORY="${HOME_DIRECTORY}/smart-gate"
DEVICE_DIRECTORY="${PROJECT_DIRECTORY}/packages/device"
INSTALLER_DIRECTORY="${DEVICE_DIRECTORY}/installer"
SERVICES_DIRECTORY="/etc/systemd/system"
SG_SERVICE_FILE="smart-gate.service"
FILES_TO_REMOVE_FILE="files-to-remove.txt"

############

### ENVS ###
ENV_FILE=".env"

# REQUIRED ENVS #
REQUIRED_ENVS=("AUTH_TICKET" "API_URL")
API_URL=""
AUTH_TICKET=""

# OPTIONAL CAMERA ENVS #
CAMERA_USAGE_ENABLED=""
CAMERA_USE_WIRED=""
NGROK_LOCAL_CAMERA_ADDRESS=""
NGROK_REGION=""
NGROK_AUTH_TOKEN=""

############

### COLORS ###
COL_NC='\e[0m' # No Color
COL_LIGHT_GREEN='\e[1;32m'
COL_LIGHT_RED='\e[1;31m'
COL_LIGHT_YELLOW='\e[1;33m'
TICK="[${COL_LIGHT_GREEN}✓${COL_NC}]"
CROSS="[${COL_LIGHT_RED}✗${COL_NC}]"
INFO="[i]"
OVER="\\r\\033[K"

############

### LINKS ###
DOCS_DEVICE_ENVS_LINK="https://smart-gate-docs.vercel.app"
DOCS_DEVICE_CAMERA_LINK="https://smart-gate-docs.vercel.app"
INSTALLER_RAW_LINK="https://raw.githubusercontent.com/Jozwiaczek/smart-gate/feat(device)/add-bash-installer/packages/device/installer/installer.sh"
REMOTE_REPOSITORY_LINK="https://github.com/Jozwiaczek/smart-gate.git"

############

### WHIPTAIL ###
# Dialog dimensions
# 20 rows and 70 chars width assures to fit on small screens and is known to hold all content.
r=20
c=70

ASCII_SG_LOGO="
 █████ ██    ██  ███  ████  ███████    █████   ███  ███████ █████
 █     ███  ███ █   █ █   █    █      █       █   █    █    █
 █████ █  ██  █ █████ ████     █     █   ██   █████    █    ████
     █ █      █ █   █ █   █    █      █    █  █   █    █    █
 █████ █      █ █   █ █   █    █       ████   █   █    █    █████
"

# A simple function that just echoes out Smart Gate logo in ASCII format
# This lets users know that it is a Smart Gate script
show_ascii_logo() {
  echo -e "$ASCII_SG_LOGO"
}

# Checks to see if the given command (passed as a string argument) exists on the system.
# The function returns 0 (success) if the command exists, and 1 if it doesn't.
is_command() {
    local check_command="$1"
    command -v "${check_command}" >/dev/null 2>&1
}

check_privileges() {
    # Must be root to install
    local str="Root user check"
    printf "\\n"

    # If the user's id is zero,
    if [[ "${EUID}" -eq 0 ]]; then
        # they are root and all is good
        printf "  %b %s\\n" "${TICK}" "${str}"
        # Show the Smart Gate logo so people know it's genuine since the logo and name are trademarked
        show_ascii_logo
    else
        # Otherwise, they do not have enough privileges, so let the user know
        printf "  %b %s\\n" "${INFO}" "${str}"
        printf "  %b %bScript called with non-root privileges%b\\n" "${INFO}" "${COL_LIGHT_RED}" "${COL_NC}"
        printf "      The Smart Gate requires elevated privileges to install and run\\n"
        printf "      Please check the installer for any concerns regarding this requirement\\n"
        printf "      Make sure to download this script from a trusted source\\n\\n"
        printf "  %b Sudo utility check" "${INFO}"

        # If the sudo command exists, try rerunning as admin
        if is_command sudo ; then
            printf "%b  %b Sudo utility check\\n" "${OVER}"  "${TICK}"

            # when run via curl piping
            if [[ "$0" == "bash" ]]; then
                # Download the install script and run it with admin rights
                exec curl -sSL ${INSTALLER_RAW_LINK} | sudo bash "$@"
            else
                # when run via calling local bash script
                exec sudo bash "$0" "$@"
            fi

            exit $?
        else
            # Otherwise, tell the user they need to run the script as root, and bail
            printf "%b  %b Sudo utility check\\n" "${OVER}" "${CROSS}"
            printf "  %b Sudo is needed for the Web Interface to run Smart Gate commands\\n\\n" "${INFO}"
            printf "  %b %bPlease re-run this installer as root${COL_NC}\\n" "${INFO}" "${COL_LIGHT_RED}"
            exit 1
        fi
    fi
}

checkNodeJs() {
  printf "  %b Checking Node.js version\\n" "${INFO}"
  if which node > /dev/null; then
    # Node.js already install, continue
    printf "%b  %b Node.js already exists\\n" "${OVER}"  "${TICK}"
  else
    printf "  %b Node.js not found\\n" "${INFO}"
    printf "  %b Installing Node.js LTS\\n" "${INFO}"
    curl -sSL https://deb.nodesource.com/setup_lts.x | sudo bash -
    sudo apt install -y nodejs
    printf "%b  %b Node.js installed\\n" "${OVER}"  "${TICK}"
  fi

  NODE_VERSION=$(node -v)
  printf "%b  %b Node.js version is %b\\n" "${OVER}"  "${TICK}"  "${NODE_VERSION}"
}

checkYarn() {
  printf "  %b Checking Yarn version\\n" "${INFO}"
  if which yarn > /dev/null; then
    printf "%b  %b Yarn already exists\\n" "${OVER}"  "${TICK}"
  else
    printf "  %b Yarn not found\\n" "${INFO}"
    printf "  %b Installing Yarn\\n" "${INFO}"
    npm install --global yarn
    printf "%b  %b Yarn installed\\n" "${OVER}"  "${TICK}"
  fi

  YARN_VERSION=$(yarn -v)
  printf "%b  %b Yarn version is %b\\n" "${OVER}"  "${TICK}"  "${YARN_VERSION}"
}

downloadRepository() {
  printf "  %b Downloading Smart Gate repository\\n" "${INFO}"
#  git clone "$REMOTE_REPOSITORY_LINK" "$PROJECT_DIRECTORY"
  git clone -b "feat(device)/add-bash-installer" "$REMOTE_REPOSITORY_LINK" "$PROJECT_DIRECTORY"
  printf "%b  %b Smart Gate repository downloaded\\n" "${OVER}"  "${TICK}"
}

updateRepository() {
  cd "$PROJECT_DIRECTORY"
  local_branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
  # shellcheck disable=SC1083
  remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
  remote=$(git config branch."$local_branch".remote)

  printf "  %b Checking remote repository for update\\n" "${INFO}"
  git fetch "$remote"

  if git merge-base --is-ancestor "$remote_branch" HEAD; then
    printf "%b  %b Local repository is up to date\\n" "${OVER}"  "${TICK}"
    return
  fi

  if (whiptail --title "Repository update" --yesno "\\n\\nThere is a new version of Smart Gate repository available, do you want to update now? (Recommended)" "${r}" "${c}"); then
    printf "  %b Updating local repository\\n" "${INFO}"

    if git merge-base --is-ancestor HEAD "$remote_branch"; then
      printf "  %b Fast-forward possible. Merging...\\n" "${INFO}"
      git merge --ff-only --stat "$remote_branch"
    else
      printf "  %b Fast-forward not possible. Rebasing...\\n" "${INFO}"
      git rebase --preserve-merges --stat "$remote_branch"
    fi

    printf "%b  %b Local repository updated\\n" "${OVER}"  "${TICK}"
  else
    printf "  %b Update skipped\\n" "${INFO}"
  fi
}

checkRepository() {
  printf "  %b Repository check\\n" "${INFO}"
  if [[ -d "$PROJECT_DIRECTORY" ]]; then
    printf "%b  %b Local repository found\\n" "${OVER}"  "${TICK}"
    updateRepository
  else
    printf "  %b Local repository not found\\n" "${INFO}"
    downloadRepository
  fi
}

checkUnusedFiles() {
  cd "$PROJECT_DIRECTORY"
  printf "  %b Checking unused files\\n" "${INFO}"
  installer_files_to_remove="${INSTALLER_DIRECTORY}/${FILES_TO_REMOVE_FILE}"
  found_files_to_remove_counter=0

  while IFS= read -r fileToRemove; do
    if [[ -f $fileToRemove || -d $fileToRemove ]]; then
      found_files_to_remove_counter=$((found_files_to_remove_counter + 1))
    fi
  done < "$installer_files_to_remove"

  if [[ $found_files_to_remove_counter -eq 0 ]]; then
      printf "%b  %b No unused files found\\n" "${OVER}"  "${TICK}"
      return
  fi

  if (whiptail --title "Removing unused files" --yesno "\\n\\nThere are $found_files_to_remove_counter unused files, do you want to delete them? (Recommended)" "${r}" "${c}"); then
    printf "  %b Removing unused files\\n" "${INFO}"
    xargs rm -rf < "$installer_files_to_remove"
    printf "%b  %b %b unused files removed\\n" "${OVER}"  "${TICK}" "${found_files_to_remove_counter}"
  else
    printf "  %b Skipping removing unused files\\n" "${INFO}"
  fi
}

checkRequiredEnv() {
  cd "$DEVICE_DIRECTORY"
  printf "  %b Checking required ENVs\\n" "${INFO}"
  local missing_envs=()

  while IFS= read -r line; do
    key=${line%=*}
    value=${line#*=}
    if [[ ${REQUIRED_ENVS[*]} =~ ${key} && -z "$value" ]]; then
      printf "  %b  %b \"$key\" env variable is required\\n" "${OVER}" "${CROSS}"
      missing_envs+=("$key")
    fi
  done < $ENV_FILE

  # shellcheck disable=SC2128
  if [ -n "$missing_envs" ]; then
    printf "  %b %bMissing envs variables. Add it to %b file and re-run this installer${COL_NC}\\n" "${INFO}" "${COL_LIGHT_RED}" "$ENV_FILE"
    exit 1
  fi

  printf "%b  %b All required envs have been found\\n" "${OVER}"  "${TICK}"
}

setCameraEnvs() {
  printf "  %b Configuring camera envs\\n" "${INFO}"

  CAMERA_USAGE_ENABLED="true"

  NGROK_AUTH_TOKEN=$(whiptail --title "Environmental variables setup (NGROK_AUTH_TOKEN)" --passwordbox "\\n\\nEnter your Ngrok Auth Token." "${r}" "${c}" 3>&1 1>&2 2>&3)

  NGROK_REGION=$(
    whiptail --title "Environmental variables setup (NGROK_REGION)" --radiolist \
      "\\n\\nChoose Ngrok region. (Use space to mark option)\nIt should be the nearest to the region where device is located to reduce connection latency." "${r}" "${c}" 7 \
      "eu" "Europe (Frankfurt)" ON \
      "us" "United States (Ohio)" OFF \
      "ap" "Asia/Pacific (Singapore)" OFF \
      "au" "Australia (Sydney)" OFF \
      "sa" "South America (Sao Paulo)" OFF \
      "jp" "Japan (Tokyo)" OFF \
      "in" "India (Mumbai)" OFF \
    3>&1 1>&2 2>&3)

  connectionType=$(
    whiptail --title "Environmental variables setup (CAMERA_USE_WIRED)" --radiolist \
      "\\n\\nChoose camera connection type. (Use space to mark option)" "${r}" "${c}" 2 \
      "Wired" "Camera connected over USB or CSI" ON \
      "Wireless" "Camera served over local HTTP stream" OFF \
    3>&1 1>&2 2>&3)

  if [ "$connectionType" = "Wired" ]; then
    CAMERA_USE_WIRED="true"
    NGROK_LOCAL_CAMERA_ADDRESS="http://localhost:8081"
  else
    CAMERA_USE_WIRED="false"
    NGROK_LOCAL_CAMERA_ADDRESS=$(whiptail --title "\\n\\nEnvironmental variables setup (NGROK_LOCAL_CAMERA_ADDRESS)" --inputbox "\\n\\nEnter local camera address with video stream" "${r}" "${c}" "${NGROK_LOCAL_CAMERA_ADDRESS}" 3>&1 1>&2 2>&3)
  fi

  printf "%b  %b Camera envs configured\\n" "${OVER}"  "${TICK}"
}

welcomeDialog() {
 whiptail --msgbox --title "Smart Gate Device Installer" "\\n\\n$ASCII_SG_LOGO\\n\\n  This installer will automatically configure Smart Gate system on this device!" "${r}" "${c}"
}

checkEnvs() {
  cd "$DEVICE_DIRECTORY"
  printf "  %b Checking .env file\\n" "${INFO}"

  if [ -e $ENV_FILE ]; then
    printf "%b  %b .env file exists\\n" "${OVER}"  "${TICK}"
    checkRequiredEnv
  else
    printf "  %b .env file not found. Creating new .env file\\n" "${INFO}"

    whiptail --msgbox --title "Environmental variables setup" "\\n\\nIn the next steps, You will configure Smart Gate system variables.\\n\\nFor more details check Smart Gate documentation site:\\n$DOCS_DEVICE_ENVS_LINK" "${r}" "${c}"

    API_URL=$(whiptail --title "Environmental variables setup (API_URL)" --inputbox "\\n\\nEnter your Smart Gate deployed server URL" "${r}" "${c}" "${API_URL}" 3>&1 1>&2 2>&3)
    AUTH_TICKET=$(whiptail --title "Environmental variables setup (AUTH_TICKET)" --passwordbox "\\n\\nEnter your Auth ticket. It should be same value as for server env." "${r}" "${c}" "${AUTH_TICKET}" 3>&1 1>&2 2>&3)

    if (whiptail --title "Environmental variables setup (CAMERA_USAGE_ENABLED)" --yesno "\\n\\nCamera setup is optional.\\n\\nFor more details check Smart Gate documentation site:\\n$DOCS_DEVICE_CAMERA_LINK.\\n\\nDo You want to setup your camera right now?" "${r}" "${c}"); then
      setCameraEnvs
    else
      printf "  %b Camera setup skipped\\n" "${INFO}"
    fi

    whiptail --title "Environmental variables setup" --msgbox "\\n\\nAll environmental variables configured successfully." "${r}" "${c}"

    (
      echo "API_URL=$API_URL";
      echo "AUTH_TICKET=$AUTH_TICKET";
      echo "CAMERA_USAGE_ENABLED=$CAMERA_USAGE_ENABLED";
      echo "CAMERA_USE_WIRED=$CAMERA_USE_WIRED";
      echo "NGROK_AUTH_TOKEN=$NGROK_AUTH_TOKEN";
      echo "NGROK_REGION=$NGROK_REGION";
      echo "NGROK_LOCAL_CAMERA_ADDRESS=$NGROK_LOCAL_CAMERA_ADDRESS"
    ) >> $ENV_FILE

    printf "%b  %b .env file created\\n" "${OVER}"  "${TICK}"
    checkRequiredEnv
  fi
}

installDeviceDependencies() {
  cd "$DEVICE_DIRECTORY"
  printf "  %b Installing device dependencies\\n" "${INFO}"
  yarn install
  printf "%b  %b Device dependencies installed\\n" "${OVER}"  "${TICK}"
}

startService() {
  printf "  %b Starting service\\n" "${INFO}"
  systemctl enable smart-gate
  systemctl start smart-gate
  printf "%b  %b Service started\\n" "${OVER}"  "${TICK}"
  printf "  %b To check service logs use \"cat /var/log/smart-gate-standard.log\" command\\n" "${INFO}"
  printf "  %b To check service errors use \"cat /var/log/smart-gate-error.log\" command\\n" "${INFO}"
}

stopService() {
  printf "%b  %b Stopping service\\n" "${OVER}"  "${TICK}"
  systemctl disable smart-gate
  systemctl stop smart-gate
  printf "%b  %b Service stopped\\n" "${OVER}"  "${TICK}"
}

restartService() {
  printf "  %b Restarting service\\n" "${INFO}"
  stopService
  startService
  printf "%b  %b Service restarted\\n" "${OVER}"  "${TICK}"
}

checkService() {
  printf "  %b Checking Systemd service\\n" "${INFO}"

  if [ -e "$SERVICES_DIRECTORY/$SG_SERVICE_FILE" ]; then
    printf "%b  %b Service file already exists\\n" "${OVER}"  "${TICK}"

    # Check is there a newer version of the service
    if ! (cmp --silent "$SERVICES_DIRECTORY/$SG_SERVICE_FILE" "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE") ; then
      if (whiptail --title "Systemd Service Update" --yesno "\\n\\nThere is a new version of Smart Gate systemd service available, do you want to update now? (Recommended)" "${r}" "${c}"); then
        rm "$SERVICES_DIRECTORY/$SG_SERVICE_FILE"
        cp "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE" $SERVICES_DIRECTORY
      fi
    fi

    restartService
  else
    printf "  %b Service file not found\\n" "${INFO}"
    printf "  %b Creating service file\\n" "${INFO}"
    cp "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE" $SERVICES_DIRECTORY
    printf "%b  %b Service file created\\n" "${OVER}"  "${TICK}"
    startService
  fi
}

main() {
  check_privileges "$@"
  welcomeDialog
  checkNodeJs
  checkYarn
  checkRepository
  checkUnusedFiles
  checkEnvs
  installDeviceDependencies
  checkService
}

main "$@"
