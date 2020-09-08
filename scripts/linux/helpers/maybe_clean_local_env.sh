#!/bin/bash

set -o pipefail

if [ -f "$PROJ_ROOT/.env" ]
then
  echo "$PROJ_ROOT/.env exists, remove first"
  rm -f "$PROJ_ROOT/.env"
fi
