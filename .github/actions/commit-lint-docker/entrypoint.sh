#!/bin/bash

COMMIT_MSG="$1"
REGEX="^(feat|fix|chore|docs): .*"

echo "Validating commit message: '$COMMIT_MSG'"

if [[ "$COMMIT_MSG" =~ $REGEX ]]; then
  echo "Commit message valid"
  exit 0
else
  echo "The commit message doesn´t comply with the conventional commits formats"
  exit 1
fi