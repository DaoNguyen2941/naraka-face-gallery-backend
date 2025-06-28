#!/bin/sh
set -e

# Chờ MySQL sẵn sang
./wait-for-it.sh $DB_HOST:$DB_PORT -- npm run start:dev
