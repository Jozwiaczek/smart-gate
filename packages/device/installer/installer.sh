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

######## LOGGERS #########

# A simple function that just echoes out Smart Gate logo in ASCII format
# This lets users know that it is a Smart Gate script
show_ascii_logo() {
  echo -e "$ASCII_SG_LOGO"
}

log_info() {
  printf "  %b $1\\n" "${INFO}"
}

log_red_info() {
  printf "  %b %b $1%b\\n" "${INFO}" "${COL_LIGHT_RED}" "${COL_NC}"
}

log_green_info() {
  printf "  %b %b $1%b\\n" "${INFO}" "${COL_LIGHT_GREEN}" "${COL_NC}"
}

log_yellow_info() {
  printf "  %b %b $1%b\\n" "${INFO}" "${COL_LIGHT_YELLOW}" "${COL_NC}"
}

log_success() {
  printf "%b  %b $1\\n" "${OVER}"  "${TICK}"
}

log_error() {
  printf "%b  %b $1\\n" "${OVER}" "${CROSS}"
}

completed_successfully_dialog() {
  whiptail --msgbox --title "Smart Gate Device Installer" "\\n\\nInstallation completed successfully!\\n\\n\\n\\nIn order to check logs, in terminal enter command:\\n\\n    -  For standard logs: \"cat /var/log/smart-gate-standard.log\"\\n\\n    -  For errors: \"cat /var/log/smart-gate-error.log\"" "${r}" "${c}"
  log_success "Installation completed successfully"
}

welcome_dialog() {
  whiptail --msgbox --title "Smart Gate Device Installer" "\\n\\n$ASCII_SG_LOGO\\n\\nThis installer will automatically configure Smart Gate system on this device!" "${r}" "${c}"
}

############

# Checks to see if the given command (passed as a string argument) exists on the system.
# The function returns 0 (success) if the command exists, and 1 if it doesn't.
is_command() {
    local check_command="$1"
    command -v "${check_command}" >/dev/null 2>&1
}

check_privileges() {
    # Must be root to install
    printf "\\n"

    # If the user's id is zero,
    if [[ "${EUID}" -eq 0 ]]; then
        # they are root and all is good
        log_success "Root user check"
        # Show the Smart Gate logo so people know it's genuine since the logo and name are trademarked
        show_ascii_logo
    else
        # Otherwise, they do not have enough privileges, so let the user know
        log_info "Root user check"
        printf "  %b %bScript called with non-root privileges%b\\n" "${INFO}" "${COL_LIGHT_RED}" "${COL_NC}"
        printf "      The Smart Gate requires elevated privileges to install and run\\n"
        printf "      Please check the installer for any concerns regarding this requirement\\n"
        printf "      Make sure to download this script from a trusted source\\n\\n"
        log_info "Sudo utility check"

        # If the sudo command exists, try rerunning as admin
        if is_command sudo ; then
            log_success "Sudo utility check"

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
            log_error "Sudo utility check"
            log_info "Sudo is needed for the Web Interface to run Smart Gate commands"
            log_red_info "Please re-run this installer as root"
            exit 1
        fi
    fi
}

check_node_js() {
  log_info "Checking Node.js version"
  if which node > /dev/null; then
    # Node.js already install, continue
    log_success "Node.js already exists"
  else
    log_info "Node.js not found"
    log_info "Installing Node.js LTS"
    curl -sSL https://deb.nodesource.com/setup_lts.x | sudo bash -
    sudo apt install -y nodejs
    log_success "Node.js installed"
  fi

  NODE_VERSION=$(node -v)
  log_success "Node.js version is $NODE_VERSION"
}

check_yarn() {
  log_info "Checking Yarn version"
  if which yarn > /dev/null; then
    log_success "Yarn already exists"
  else
    log_info "Yarn not found"
    log_info "Installing Yarn"
    npm install --global yarn
    log_success "Yarn installed"
  fi

  YARN_VERSION=$(yarn -v)
  log_success "Yarn version is $YARN_VERSION"
}

download_repository() {
  log_info "Downloading Smart Gate repository"
#  git clone "$REMOTE_REPOSITORY_LINK" "$PROJECT_DIRECTORY"
  git clone -b "feat(device)/add-bash-installer" "$REMOTE_REPOSITORY_LINK" "$PROJECT_DIRECTORY"
  log_success "Smart Gate repository downloaded"
}

update_repository() {
  cd "$PROJECT_DIRECTORY"
  local_branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
  # shellcheck disable=SC1083
  remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
  remote=$(git config branch."$local_branch".remote)

  log_info "Checking remote repository for update"
  git fetch "$remote"

  if git merge-base --is-ancestor "$remote_branch" HEAD; then
    log_success "Local repository is up to date"
    return
  fi

  if (whiptail --title "Repository update (Recommended)" --yesno "\\n\\nThere is a new version of Smart Gate repository available, do you want to update now? (Recommended)" "${r}" "${c}"); then
    log_info "Updating local repository"

    if git merge-base --is-ancestor HEAD "$remote_branch"; then
      log_info "Fast-forward possible. Merging..."
      git merge --ff-only --stat "$remote_branch"
    else
      log_info "Fast-forward not possible. Rebasing..."
      git rebase --preserve-merges --stat "$remote_branch"
    fi

    log_success "Local repository updated"
  else
    log_info "Update skipped"
  fi
}

check_repository() {
  log_info "Repository check"
  if [[ -d "$PROJECT_DIRECTORY" ]]; then
    log_success "Local repository found"
    update_repository
  else
    log_info "Local repository not found"
    download_repository
  fi
}

check_unused_files() {
  cd "$PROJECT_DIRECTORY"
  log_info "Checking unused files"
  installer_files_to_remove="${INSTALLER_DIRECTORY}/${FILES_TO_REMOVE_FILE}"
  found_files_to_remove_counter=0

  while IFS= read -r fileToRemove; do
    if [[ -f $fileToRemove || -d $fileToRemove ]]; then
      found_files_to_remove_counter=$((found_files_to_remove_counter + 1))
    fi
  done < "$installer_files_to_remove"

  if [[ $found_files_to_remove_counter -eq 0 ]]; then
      log_success "No unused files found"
      return
  fi

  if (whiptail --title "Removing unused repository files (Recommended)" --yesno "\\n\\nThere are $found_files_to_remove_counter Smart Gate project unused files, do you want to delete them? (Recommended)" "${r}" "${c}"); then
    log_info "Removing unused files"
    xargs rm -rf < "$installer_files_to_remove"
    log_success "$found_files_to_remove_counter unused files removed"
  else
    log_info "Skipping removing unused files"
  fi
}

check_required_env() {
  cd "$DEVICE_DIRECTORY"
  log_info "Checking required envs"
  local missing_envs=()

  while IFS= read -r line; do
    key=${line%=*}
    value=${line#*=}
    if [[ ${REQUIRED_ENVS[*]} =~ ${key} && -z "$value" ]]; then
      log_error "\"$key\" env variable is required"
      missing_envs+=("$key")
    fi
  done < $ENV_FILE

  # shellcheck disable=SC2128
  if [ -n "$missing_envs" ]; then
    log_red_info "Missing envs variables. Add it to $ENV_FILE file and re-run this installer"
    exit 1
  fi

  log_success "All required envs have been found"
}

set_camera_envs() {
  log_info "Configuring camera envs"

  CAMERA_USAGE_ENABLED="true"

  NGROK_AUTH_TOKEN=$(whiptail --title "Environmental variables setup (NGROK_AUTH_TOKEN)" --passwordbox "\\n\\nEnter your Ngrok Auth Token." "${r}" "${c}" 3>&1 1>&2 2>&3)

  NGROK_REGION=$(
    whiptail --title "Environmental variables setup (NGROK_REGION)" --radiolist \
      "\\n\\nChoose Ngrok region. (Use space to mark option)\\n\\nIt should be the nearest to the region where device is located to reduce connection latency." "${r}" "${c}" 7 \
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

  log_success "Camera envs configured"
}

check_envs() {
  cd "$DEVICE_DIRECTORY"
  log_info "Checking .env file"

  if [ -e $ENV_FILE ]; then
    log_success ".env file exists"
    check_required_env
  else
    log_info ".env file not found. Creating new .env file"

    whiptail --msgbox --title "Environmental variables setup" "\\n\\nIn the next steps you will configure Smart Gate system variables.\\n\\nFor more details check Smart Gate documentation site:\\n$DOCS_DEVICE_ENVS_LINK" "${r}" "${c}"

    API_URL=$(whiptail --title "Environmental variables setup (API_URL)" --inputbox "\\n\\nEnter your Smart Gate deployed server URL" "${r}" "${c}" "${API_URL}" 3>&1 1>&2 2>&3)
    AUTH_TICKET=$(whiptail --title "Environmental variables setup (AUTH_TICKET)" --passwordbox "\\n\\nEnter your Auth ticket.\\n\\nIt should be same value as for server env." "${r}" "${c}" "${AUTH_TICKET}" 3>&1 1>&2 2>&3)

    if (whiptail --title "Environmental variables setup (CAMERA_USAGE_ENABLED)" --yesno "\\n\\nCamera setup is optional.\\n\\nFor more details check Smart Gate documentation site:\\n$DOCS_DEVICE_CAMERA_LINK.\\n\\nDo You want to setup your camera right now?" "${r}" "${c}"); then
      set_camera_envs
    else
      log_info "Camera setup skipped"
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

    log_success ".env file created"
    check_required_env
  fi
}

install_device_dependencies() {
  cd "$DEVICE_DIRECTORY"
  log_info "Installing device dependencies"
  yarn install
  log_success "Device dependencies installed"
}

start_device() {
  log_info "Starting service"
  systemctl enable smart-gate
  systemctl start smart-gate
  log_success "Service started"
  log_yellow_info "To check service logs use \"cat /var/log/smart-gate-standard.log\" command"
  log_yellow_info "To check service errors use \"cat /var/log/smart-gate-error.log\" command"
}

stop_service() {
  log_info "Stopping service"
  systemctl disable smart-gate
  systemctl stop smart-gate
  log_success "Service stopped"
}

restart_service() {
  log_info "Restarting service"
  stop_service
  start_device
  log_success "Service restarted"
}

check_service() {
  log_info "Checking Systemd service"

  if [ -e "$SERVICES_DIRECTORY/$SG_SERVICE_FILE" ]; then
    log_success "Service file already exists"

    log_info "Check is there a newer version of service config file"
    if ! (cmp --silent "$SERVICES_DIRECTORY/$SG_SERVICE_FILE" "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE") ; then
      log_success "Found newer version of service config file"
      if (whiptail --title "Systemd Service Update (Recommended)" --yesno "\\n\\nThere is a new version of Smart Gate service config file available, do you want to update now? (Recommended)" "${r}" "${c}"); then
        log_info "Updating service config file"
        rm "$SERVICES_DIRECTORY/$SG_SERVICE_FILE"
        cp "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE" $SERVICES_DIRECTORY
        log_success "Service file updated"
      fi
    fi

    restart_service
  else
    log_info "Service file not found"
    log_info "Creating service file"
    cp "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE" $SERVICES_DIRECTORY
    log_success "Service file created"
    start_device
  fi
}

main() {
  check_privileges "$@"
  welcome_dialog
  check_node_js
  check_yarn
  check_repository
  check_unused_files
  check_envs
  install_device_dependencies
  check_service
  completed_successfully_dialog
}

main "$@"
