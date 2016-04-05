#!/bin/bash

## This script needs to be in the same location as the dockerfile.

IMAGE=$1
SCRIPTPATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -z $IMAGE ]; then
  IMAGE="jackgardner/ss-thermisto"
fi

docker build -t $IMAGE $SCRIPTPATH
