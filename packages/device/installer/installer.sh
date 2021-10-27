#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
# -u option exit when script tries to use undeclared variables
set -eu

# Append common folders to the PATH to ensure that all basic commands are available.
# When using "su" an incomplete PATH could be passed: https://github.com/pi-hole/pi-hole/issues/3209
export PATH+=':/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
MODULES_DIR="${SCRIPT_DIR}/modules"
source "${MODULES_DIR}/variables.sh"
source "${MODULES_DIR}/check-privileges.sh"
source "${MODULES_DIR}/check-envs.sh"
source "${MODULES_DIR}/check-repository.sh"
source "${MODULES_DIR}/check-service.sh"
source "${MODULES_DIR}/check-unused-files.sh"
source "${MODULES_DIR}/check-system-dependencies.sh"

welcome_dialog() {
 whiptail --msgbox --title "Smart Gate Device Installer" "\\n\\n$ASCII_SG_LOGO\\n\\n  This installer will automatically configure Smart Gate system on this device!" "${r}" "${c}"
}

main() {
  check_privileges "$@"
  welcome_dialog
  check_system_dependencies
  check_repository
  check_unused_files
  check_envs
  check_service
}

main "$@"
