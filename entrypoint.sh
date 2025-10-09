#!/bin/sh
set -e

echo "⏳ Waiting for MySQL at $DB_HOST:$DB_PORT..."
/wait-for-it.sh "$DB_HOST:$DB_PORT" --timeout=60 -- echo "✅ MySQL is up!"

echo "🚀 Starting NestJS in production mode..."
exec node dist/main.js
