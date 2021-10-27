#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
# -u option exit when script tries to use undeclared variables
set -eu

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/variables.sh"

check_required_env() {
  cd "$DEVICE_DIRECTORY"
  printf "  %b Checking required ENVs\\n" "${INFO}"
  local missing_envs=()

  while IFS= read -r line; do
    local key=${line%=*}
    local value=${line#*=}
    if [[ ${REQUIRED_ENVS[*]} =~ ${key} && -z "$value" ]]; then
      printf "  %b  %b \"$key\" env variable is required\\n" "${OVER}" "${CROSS}"
      missing_envs+=("$key")
    fi
  done < "$ENV_FILE"

  ## missing_envs non empty
  if [[ ${missing_envs[*]:+${missing_envs[*]}} ]]; then
    printf "  %b %bMissing envs variables. Add it to %b file and re-run this installer${COL_NC}\\n" "${INFO}" "${COL_LIGHT_RED}" "$ENV_FILE"
    exit 1
  fi

  printf "%b  %b All required envs have been found\\n" "${OVER}"  "${TICK}"
}

set_camera_envs() {
  printf "  %b Configuring camera envs\\n" "${INFO}"

  CAMERA_USAGE_ENABLED="true"

  # shellcheck disable=SC2154
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

check_envs() {
  cd "$DEVICE_DIRECTORY"
  printf "  %b Checking .env file\\n" "${INFO}"

  if [ -e "$ENV_FILE" ]; then
    printf "%b  %b .env file exists\\n" "${OVER}"  "${TICK}"
    check_required_env
  else
    printf "  %b .env file not found. Creating new .env file\\n" "${INFO}"

    whiptail --msgbox --title "Environmental variables setup" "\\n\\nIn the next steps, You will configure Smart Gate system variables.\\n\\nFor more details check Smart Gate documentation site:\\n$DOCS_DEVICE_ENVS_LINK" "${r}" "${c}"

    API_URL=$(whiptail --title "Environmental variables setup (API_URL)" --inputbox "\\n\\nEnter your Smart Gate deployed server URL" "${r}" "${c}" "${API_URL}" 3>&1 1>&2 2>&3)
    AUTH_TICKET=$(whiptail --title "Environmental variables setup (AUTH_TICKET)" --passwordbox "\\n\\nEnter your Auth ticket. It should be same value as for server env." "${r}" "${c}" "${AUTH_TICKET}" 3>&1 1>&2 2>&3)

    if (whiptail --title "Environmental variables setup (CAMERA_USAGE_ENABLED)" --yesno "\\n\\nCamera setup is optional.\\n\\nFor more details check Smart Gate documentation site:\\n$DOCS_DEVICE_CAMERA_LINK.\\n\\nDo You want to setup your camera right now?" "${r}" "${c}"); then
      set_camera_envs
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
    ) >> "$ENV_FILE"

    printf "%b  %b .env file created\\n" "${OVER}"  "${TICK}"
    check_required_env
  fi
}
