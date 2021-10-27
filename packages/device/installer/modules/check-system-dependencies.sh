#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
# -u option exit when script tries to use undeclared variables
set -eu

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/variables.sh"

check_node_js() {
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

  local -r node_version=$(node -v)
  printf "%b  %b Node.js version is %b\\n" "${OVER}"  "${TICK}"  "${node_version}"
}

check_yarn() {
  printf "  %b Checking Yarn version\\n" "${INFO}"
  if which yarn > /dev/null; then
    printf "%b  %b Yarn already exists\\n" "${OVER}"  "${TICK}"
  else
    printf "  %b Yarn not found\\n" "${INFO}"
    printf "  %b Installing Yarn\\n" "${INFO}"
    npm install --global yarn
    printf "%b  %b Yarn installed\\n" "${OVER}"  "${TICK}"
  fi

  local -r yarn_version=$(yarn -v)
  printf "%b  %b Yarn version is %b\\n" "${OVER}"  "${TICK}"  "${yarn_version}"
}

check_system_dependencies() {
  check_node_js
  check_yarn
}
