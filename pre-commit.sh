#!/usr/bin/env bash

PROJECTS_KEYS=(
  TA
)

get_projects_keys () {
  IFS=$'|'; echo "${PROJECTS_KEYS[*]}"
}

set_project_technologies () {
  NODE_FILE=${PWD}/package.json
  COMPOSER_FILE=${PWD}/composer.json
  IS_NODE=false
  IS_COMPOSER=false

  if [ -f "${NODE_FILE}" ]; then
    IS_NODE=true
  fi

  if [ -f "${COMPOSER_FILE}" ]; then
    IS_COMPOSER=true
  fi
}

check_author_name_in_authors () {
  if [ -f AUTHORS ]; then
    GIT_NAME=$(git config user.name)
    GIT_EMAIL=$(git config user.email)

    GIT_USERNAME="$GIT_NAME <$GIT_EMAIL>"
    USER_IS_AUTHOR=false

    while read -r AUTHOR; do
      if [ "$AUTHOR" = "$GIT_USERNAME" ]; then
        USER_IS_AUTHOR=true
      fi
    done < AUTHORS

    if [ ! "$USER_IS_AUTHOR" = "true" ]; then
      echo "Aborting commit. User is not registered in the AUTHORS file." >&2
      exit 1
    fi
  fi
}

check_branch_name () {
  BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
  BRANCH_REGEX="^((feature|bugfix|hotfix)\/(NOTASK_\w+|($(get_projects_keys))-[0-9]+))|(release\/[0-9]+.[0-9]+.[0-9]+)|(^master$|^develop$)\w*$"
  # prevents error in empty repositories
  if [ "$BRANCH_NAME" = "HEAD" ]; then
    BRANCH_NAME=master
  fi
  if ! (echo "$BRANCH_NAME" | grep -iqE "$BRANCH_REGEX"); then
    echo "Aborting commit. Your branch name must start with 'origin/feature/${BRANCH_REGEX}-'." >&2
    exit 1
  fi
}

run_node_test () {
  if ! CI=true npm test; then
    echo "Aborting commit. Test Finished with errors." >&2
    exit 1
  fi
}

run_composer_test () {
  if ! composer test; then
    echo "Aborting commit. Test Finished with errors." >&2
    exit 1
  fi
}

run_node_lint () {
  if ! npm run lint; then
    echo "Aborting commit. Lint Finished with errors." >&2
    exit 1
  fi
}

run_composer_lint () {
  if ! composer lint; then
    echo "Aborting commit. Lint Finished with errors." >&2
    exit 1
  fi
}
run_node_actions () {
  if grep -q '"lint":' "$NODE_FILE";then
    run_node_lint
  fi
  if grep -q '"test":' "$NODE_FILE";then
    run_node_test
  fi
}

run_composer_actions () {
  if grep -q '"lint":' "$COMPOSER_FILE";then
    run_composer_lint
  fi
  if grep -q '"test":' "$COMPOSER_FILE";then
    run_composer_test
  fi
}

run_actions () {
  if $IS_NODE ;then
    run_node_actions
  fi
  if $IS_COMPOSER ;then
    run_composer_actions
  fi
}

set_project_technologies
check_author_name_in_authors
check_branch_name
run_actions