#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/variables.sh"

start_service() {
  printf "  %b Starting service\\n" "${INFO}"
  systemctl enable smart-gate
  systemctl start smart-gate
  printf "%b  %b Service started\\n" "${OVER}"  "${TICK}"
  printf "  %b To check service logs use \"cat /var/log/smart-gate-standard.log\" command\\n" "${INFO}"
  printf "  %b To check service errors use \"cat /var/log/smart-gate-error.log\" command\\n" "${INFO}"
}

stop_service() {
  printf "%b  %b Stopping service\\n" "${OVER}"  "${TICK}"
  systemctl disable smart-gate
  systemctl stop smart-gate
  printf "%b  %b Service stopped\\n" "${OVER}"  "${TICK}"
}

restart_service() {
  printf "  %b Restarting service\\n" "${INFO}"
  stop_service
  start_service
  printf "%b  %b Service restarted\\n" "${OVER}"  "${TICK}"
}

check_service() {
  printf "  %b Checking Systemd service\\n" "${INFO}"

  if [ -e "$SERVICES_DIRECTORY/$SG_SERVICE_FILE" ]; then
    printf "%b  %b Service file already exists\\n" "${OVER}"  "${TICK}"
    if systemctl is-active --quiet smart-gate ; then
      restart_service
    else
      start_service
    fi
  else
    printf "  %b Service file not found\\n" "${INFO}"
    printf "  %b Creating service file\\n" "${INFO}"
    if ! [ -f "$installer_files_to_remove" ]; then
      printf "%b  %b Missing file \"$SG_SERVICE_FILE\"\\n" "${OVER}" "${CROSS}"
      exit 1
    fi
    cp "$INSTALLER_DIRECTORY/$SG_SERVICE_FILE" "$SERVICES_DIRECTORY"
    printf "%b  %b Service file created\\n" "${OVER}"  "${TICK}"
    start_service
  fi
}
