# ==============================
# Stage 1: Build NestJS app
# ==============================
FROM node:20-alpine AS builder

# Cài đặt công cụ cần thiết để build (cho bcrypt, Sentry CLI, v.v.)
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

# Copy package.json và package-lock.json để tận dụng cache
COPY package*.json ./

# Cài đặt tất cả dependencies (bao gồm dev)
RUN npm ci

# Copy toàn bộ source code
COPY . .

# Build project NestJS -> dist/
RUN --mount=type=secret,id=sentry_auth_token \
    export SENTRY_AUTH_TOKEN=$(cat /run/secrets/sentry_auth_token) && \
    npm run build
# ==============================
# Stage 2: Production image
# ==============================
FROM node:20-alpine
WORKDIR /app

# Cài gói cần thiết cho môi trường production
COPY package*.json ./
RUN npm ci --only=production

# Copy build output từ stage builder
COPY --from=builder /app/dist ./dist

# Copy script entrypoint + wait-for-it
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose cổng NestJS
EXPOSE 3001

# Environment mặc định
ENV NODE_ENV=production

# Lệnh khởi chạy chính
ENTRYPOINT ["/entrypoint.sh"]
