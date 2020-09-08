#!/bin/bash

set -o pipefail

export LINUX_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export LINUX_HELPER_SCRIPT_DIR="$LINUX_SCRIPT_DIR/helpers"
export SCRIPT_DIR="$(dirname "$LINUX_SCRIPT_DIR")"
export PROJ_ROOT="$(dirname "$SCRIPT_DIR")"
export CRED_LOCATION=$HOME/project-temp/check-group-credential
export CRED_REPO=github.com/tianhaoz95/check-group-credential.git