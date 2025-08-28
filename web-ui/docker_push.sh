#!/usr/bin/env bash

VERSION=$(head -n 1 version.txt)

docker image push ur3amp/onregelmatige-werkwoorden:latest
docker image push ur3amp/onregelmatige-werkwoorden:"${VERSION}"