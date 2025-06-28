#!/usr/bin/env bash

hostport="$1"
shift
cmd="$@"

host=$(echo $hostport | cut -d: -f1)
port=$(echo $hostport | cut -d: -f2)

echo "⏳ Waiting for $host:$port..."
until nc -z "$host" "$port"; do
  sleep 1
done

echo "✅ $host:$port is ready. Running command..."
exec $cmd
