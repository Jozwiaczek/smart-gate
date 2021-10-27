#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
set -e

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/variables.sh"

check_unused_files() {
  printf "  %b Checking unused files\\n" "${INFO}"
  local -r installer_files_to_remove="${INSTALLER_DIRECTORY}/${FILES_TO_REMOVE_FILE}"
  local found_files_to_remove_counter=0

  if ! [ -f "$installer_files_to_remove" ]; then
    printf "%b  %b Missing file \"$FILES_TO_REMOVE_FILE\"\\n" "${OVER}" "${CROSS}"
    exit 1
  fi

  while IFS= read -r fileToRemove; do
      if [[ -f $fileToRemove || -d $fileToRemove ]]; then
        found_files_to_remove_counter=$((found_files_to_remove_counter + 1))
      fi
  done < "$installer_files_to_remove"

  if [[ $found_files_to_remove_counter -eq 0 ]]; then
      printf "%b  %b No unused files found\\n" "${OVER}"  "${TICK}"
      return
  fi

  read -p "$(printf "%b  %b There are %b unused files, do you want to delete them? (y/n)  %b\\n\\n" "${COL_LIGHT_YELLOW}" "${INFO}" "${found_files_to_remove_counter}" "${COL_NC}")" -n 1 -r
  echo    # move to a new line

  if [[ $REPLY =~ ^[Yy]$ ]]; then
    printf "  %b Removing unused files\\n" "${INFO}"
    xargs rm -rf < "$installer_files_to_remove"
    printf "%b  %b %b unused files removed\\n" "${OVER}"  "${TICK}" "${found_files_to_remove_counter}"
  else
    printf "  %b Skipping removing unused files\\n" "${INFO}"
  fi
}
