#!/bin/sh -eu

find ./ | entr -rc go run server.go &
cd site && yarn start &
sleep 1
cd proxy && yarn start &
