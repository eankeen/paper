#!/bin/sh -eu

find ./ | entr -rc go run server.go &
cd src && pnpm run start &
sleep 1
cd proxy && pnpm run start &
