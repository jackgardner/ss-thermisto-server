#!/bin/bash

IMAGE=$1

if [ -z $IMAGE ]; then
  IMAGE="jackgardner/ss-thermisto"
fi

echo "docker run -d -p 3000:3000 $IMAGE"
docker run -d -p 3000:3000 $IMAGE
