#!/bin/bash

set -o pipefail

if [ -d "$CRED_LOCATION" ]
then
  echo "$CRED_LOCATION exists, remove first."
  rm -rf "$CRED_LOCATION"
fi

git clone "https://${GITHUB_TOKEN}@${CRED_REPO}" "$CRED_LOCATION"