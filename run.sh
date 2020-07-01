#!/bin/sh -eu

find ./ | entr -rc go run server.go &
cd site && pnpm run start &
sleep 1
cd proxy && pnpm run start &
