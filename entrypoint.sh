#!/bin/sh
set -e

echo "[entrypoint] Loading Docker secrets..."

# Database
[ -f /run/secrets/db_pass ] && export DB_PASSWORD="$(cat /run/secrets/db_pass)"

# JWT
[ -f /run/secrets/jwt_secret ] && export SECRET_JWT="$(cat /run/secrets/jwt_secret)"
[ -f /run/secrets/jwt_refresh_secret ] && export JWT_REFRESH_TOKEN_SECRET="$(cat /run/secrets/jwt_refresh_secret)"
[ -f /run/secrets/jwt_reset_password ] && export JWT_RESET_PASSWORD="$(cat /run/secrets/jwt_reset_password)"

# Admin
[ -f /run/secrets/admin_password ] && export ADMIN_PASSWORD="$(cat /run/secrets/admin_password)"

# Cloudflare R2
[ -f /run/secrets/r2_access_key_id ] && export CLOUDFLARE_ACCESS_KEY_ID="$(cat /run/secrets/r2_access_key_id)"
[ -f /run/secrets/r2_secret_access_key ] && export CLOUDFLARE_SECRET_ACCESS_KEY="$(cat /run/secrets/r2_secret_access_key)"

# Sentry + Entry Auth
[ -f /run/secrets/sentry_dsn ] && export SENTRY_DSN="$(cat /run/secrets/sentry_dsn)"
[ -f /run/secrets/sentry_auth_token ] && export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token)"

# Chờ MySQL (nếu cần)
if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ]; then
  echo "[entrypoint] Waiting for DB at $DB_HOST:$DB_PORT..."
  ./wait-for-it.sh "$DB_HOST:$DB_PORT" -t 60 -- echo "[entrypoint] DB ready!"
fi

echo "[entrypoint] Starting NestJS app..."
exec node dist/main.js
