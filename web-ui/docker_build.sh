#!/usr/bin/env bash

VERSION=$(head -n 1 version.txt)

yarn build

docker buildx build --platform=linux/amd64 \
  -t ur3amp/onregelmatige-werkwoorden:latest \
  -t ur3amp/onregelmatige-werkwoorden:"${VERSION}" .
