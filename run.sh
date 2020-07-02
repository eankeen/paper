#!/bin/bash -eu

[ "${1:-""}" = "kill" ] && {
	for num in 3000 3001 5000 3333 3334 3335 3336; do sudo fuser -k "$num/tcp"; done
}

echo foo
# {
	# for num in 3000 3001 5000 3333 3334 3335 3336; do sudo fuser -k "$num/tcp"
	# done >/dev/null 2>&1
# } >/dev/null 2>&1
echo foo

command -v entr >/dev/null || { echo "install entr"; exit 1; }

trap signal_handler INT
signal_handler() {
	echo "closing processes"
	kill "$(jobs -p)"
	stty sane
}

find ./ | entr -rc go run server.go &
cd site && yarn start &
sleep 1
cd proxy && yarn start &


