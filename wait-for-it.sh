#!/usr/bin/env bash
# wait-for-it.sh - waits until a given host and port are available

set -e

TIMEOUT=15
QUIET=0
HOST=""
PORT=""

usage() {
  echo "Usage: $0 host:port [-t timeout] [-- command args]"
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    *:* )
      HOST=${1%:*}
      PORT=${1#*:}
      shift 1
      ;;
    -t)
      TIMEOUT="$2"
      shift 2
      ;;
    --)
      shift
      break
      ;;
    *)
      usage
      ;;
  esac
done

if [[ -z "$HOST" || -z "$PORT" ]]; then
  usage
fi

echo "⏳ Waiting for $HOST:$PORT to become available (timeout: ${TIMEOUT}s)..."

for i in $(seq 1 "$TIMEOUT"); do
  nc -z "$HOST" "$PORT" >/dev/null 2>&1 && break
  sleep 1
done

if nc -z "$HOST" "$PORT" >/dev/null 2>&1; then
  echo "✅ $HOST:$PORT is available!"
else
  echo "❌ Timeout waiting for $HOST:$PORT"
  exit 1
fi

exec "$@"
