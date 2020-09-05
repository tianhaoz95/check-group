#!/bin/bash

set -o pipefail

if [ -z "$PROJ_ROOT" ]
then
    echo "PROJ_ROOT not found in environment, please run \"source [project root]/scripts/linux/set_environment.sh\" first."
    exit 1
else
    "$LINUX_HELPER_SCRIPT_DIR/fetch_credential_repository.sh"
    "$LINUX_HELPER_SCRIPT_DIR/maybe_clean_local_env.sh"
    cp "$CRED_LOCATION/dev/.env" "$PROJ_ROOT/.env"
    echo "Development credentials copied!"
fi
