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
[ -f /run/secrets/cloudflare_account_id ] && export CLOUDFLARE_ACCOUNT_ID="$(cat /run/secrets/cloudflare_account_id)"

# Sentry + Entry Auth
[ -f /run/secrets/sentry_dsn ] && export SENTRY_DSN="$(cat /run/secrets/sentry_dsn)"
[ -f /run/secrets/sentry_auth_token ] && export SENTRY_AUTH_TOKEN="$(cat /run/secrets/sentry_auth_token)"

# ==============================
# WAIT FOR SERVICES
# ==============================

# Chờ MySQL 
if [ -n "$DB_HOST" ] && [ -n "$DB_PORT" ]; then
  echo "[entrypoint] Waiting for DB at $DB_HOST:$DB_PORT..."
  timeout 60 sh -c "until nc -z $DB_HOST $DB_PORT; do echo 'Waiting for DB...'; sleep 1; done"
  echo "[entrypoint] DB ready!"
fi

# Chờ Redis
if [ -n "$REDIS_HOST" ] && [ -n "$REDIS_PORT" ]; then
  echo "[entrypoint] Waiting for Redis at $REDIS_HOST:$REDIS_PORT..."
  timeout 60 sh -c "until nc -z $REDIS_HOST $REDIS_PORT; do echo 'Waiting for Redis...'; sleep 1; done"
  echo "[entrypoint] Redis ready!"
fi

# ==============================
# RUN MIGRATIONS
# ==============================
echo "[entrypoint] Running TypeORM migrations..."
if npx typeorm migration:run -d ./dist/data-source.js; then
  echo "[entrypoint] ✅ Migrations completed successfully."
else
  echo "[entrypoint] ⚠️ Migration failed — continuing startup anyway."
fi


# ==============================
# START APP
# ==============================
echo "[entrypoint] Starting NestJS app..."
exec node dist/main.js