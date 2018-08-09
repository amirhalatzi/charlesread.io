#!/usr/bin/env bash

docker build . --tag cio
docker run -it --rm --privileged -p 3000:3000 --name cio cio
