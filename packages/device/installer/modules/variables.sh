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
HOME_DIRECTORY=~
PROJECT_DIRECTORY="${HOME_DIRECTORY}/smart-gate"
DEVICE_DIRECTORY="${PROJECT_DIRECTORY}/packages/device"
INSTALLER_DIRECTORY="${DEVICE_DIRECTORY}/installer"
SERVICES_DIRECTORY="/etc/systemd/system"
SG_SERVICE_FILE="${INSTALLER_DIRECTORY}/utils/smart-gate.service"
FILES_TO_REMOVE_FILE="${INSTALLER_DIRECTORY}/utils/files-to-remove.txt"

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
GIT_REMOTE_REPOSITORY_LINK="https://github.com/Jozwiaczek/smart-gate.git"
DOCS_DEVICE_ENVS_LINK="https://smart-gate-docs.vercel.app"
DOCS_DEVICE_CAMERA_LINK="https://smart-gate-docs.vercel.app"
INSTALLER_RAW_LINK="https://raw.githubusercontent.com/Jozwiaczek/smart-gate/feat(device)/add-bash-installer/packages/device/installer/installer.sh"

############

### WHIPTAIL ###
# Dialog dimensions
r=20
c=90

ASCII_SG_LOGO="
  ███████ ███    ███  █████  ██████  ████████    ██████   █████  ████████ ███████
  ██      ████  ████ ██   ██ ██   ██    ██      ██       ██   ██    ██    ██
  ███████ ██ ████ ██ ███████ ██████     ██     ██   ███ ███████    ██    █████
       ██ ██  ██  ██ ██   ██ ██   ██    ██      ██    ██ ██   ██    ██    ██
  ███████ ██      ██ ██   ██ ██   ██    ██       ██████  ██   ██    ██    ███████
"
