#!/bin/bash

IMAGE=$1

if [ -z $IMAGE ]; then
  IMAGE="jackgardner/ss-thermisto"
fi

docker run -p 3000:3000 $IMAGE
