#!/usr/bin/env bash

# -e option instructs bash to immediately exit if any command [1] has a non-zero exit status
# We do not want users to end up with a partially working install, so we exit the script
# instead of continuing the installation with something broken
# -u option exit when script tries to use undeclared variables
set -eu

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source "${SCRIPT_DIR}/variables.sh"

install_device_dependencies() {
  printf "  %b Installing device dependencies\\n" "${INFO}"
  cd "$DEVICE_DIRECTORY"
  yarn install
  printf "%b  %b Device dependencies installed\\n" "${OVER}"  "${TICK}"
}

init_repository() {
  printf "  %b Initialising Smart Gate repository\\n" "${INFO}"
  printf "  %b Downloading repository\\n" "${INFO}"
  git clone "$GIT_REMOTE_REPOSITORY_LINK" "$PROJECT_DIRECTORY"
  printf "%b  %b Repository downloaded\\n" "${OVER}"  "${TICK}"
  install_device_dependencies
  printf "%b  %b Smart Gate repository initialised\\n" "${OVER}"  "${TICK}"
}

update_repository() {
  cd "$PROJECT_DIRECTORY"
  local -r local_branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD)
  # shellcheck disable=SC1083
  local -r remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u})
  local -r remote=$(git config branch."$local_branch".remote)

  printf "  %b Checking remote repository for update\\n" "${INFO}"
  git fetch "$remote"

  if git merge-base --is-ancestor "$remote_branch" HEAD; then
    printf "%b  %b Local repository is up to date\\n" "${OVER}"  "${TICK}"
    return
  fi

  read -p "$(printf "%b  %b There is a new version available, do you want to update now? (Recommended) (y/n)  %b\\n\\n" "${COL_LIGHT_GREEN}" "${INFO}" "${COL_NC}")" -n 1 -r
  echo    # move to a new line

  if [[ $REPLY =~ ^[Yy]$ ]]; then
    printf "  %b Updating local repository\\n" "${INFO}"

    if git merge-base --is-ancestor HEAD "$remote_branch"; then
      printf "  %b Fast-forward possible. Merging...\\n" "${INFO}"
      git merge --ff-only --stat "$remote_branch"
    else
      printf "  %b Fast-forward not possible. Rebasing...\\n" "${INFO}"
      git rebase --preserve-merges --stat "$remote_branch"
    fi

    install_device_dependencies

    printf "%b  %b Local repository updated\\n" "${OVER}"  "${TICK}"
  else
    printf "  %b Update skipped\\n" "${INFO}"
  fi
}

check_repository() {
  printf "  %b Repository check\\n" "${INFO}"
  if [[ -d "$PROJECT_DIRECTORY" ]]; then
    printf "%b  %b Local repository found\\n" "${OVER}"  "${TICK}"
    update_repository
  else
    printf "  %b Local repository not found\\n" "${INFO}"
    init_repository
  fi
}
