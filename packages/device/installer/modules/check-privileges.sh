#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
# -u option exit when script tries to use undeclared variables
set -eu

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/variables.sh"

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
                exec curl -sSL "${INSTALLER_RAW_LINK}" | sudo bash "$@"
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
