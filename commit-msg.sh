#!/usr/bin/env bash

PROJECTS_KEYS=(
  TA
)

get_projects_keys () {
  IFS=$'|'; echo "${PROJECTS_KEYS[*]}"
}

check_commit_msg () {
  echo "$HUSKY_GIT_PARAMS '++++'"
  COMMIT_REGEX="^(($(get_projects_keys))-[0-9]*|NOTASK|Merge branch) [^-]*$"
  COMMIT_MSG_FILE=$1

  git rev-parse -q --verify MERGE_HEAD && exit 0
  if ! (grep -iqE "$COMMIT_REGEX" "$HUSKY_GIT_PARAMS"); then
    echo "Aborting commit. Your commit message should start with '${PROJECTS_KEY_LIST_REGEX}-' plus the number of your feature or NOTASK or Merge branch" >&2
    exit 1
  fi
}

check_commit_msg "$1"