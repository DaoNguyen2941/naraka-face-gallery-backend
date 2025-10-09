# ==============================
# Stage 1: Build NestJS app
# ==============================
FROM node:20-alpine AS builder

# Cài đặt các gói cần thiết để build (đặc biệt để build bcrypt, Sentry CLI, v.v.)
RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

# Copy package.json và package-lock.json để tận dụng cache layer
COPY package*.json ./

# Cài đặt dependencies (bao gồm dev để build)
RUN npm ci

# Copy toàn bộ source code
COPY . .

# Build project NestJS -> dist/
RUN npm run build

# Inject & upload sourcemaps (tùy bạn bật/tắt khi deploy thực tế)
# Nếu bạn chưa cấu hình Sentry token trong môi trường build thì nên tạm disable dòng dưới:
# RUN npm run sentry:sourcemaps || true

# ==============================
# Stage 2: Production image
# ==============================
FROM node:20-alpine

WORKDIR /app

# Copy package.json để cài dependencies production
COPY package*.json ./

# Cài đặt production dependencies
RUN npm ci --only=production

# Copy dist và các file cần thiết từ builder
COPY --from=builder /app/dist ./dist

# Nếu có file cấu hình khác (ví dụ .env.example, ormconfig.js, src/data-source.ts, v.v.)
# COPY --from=builder /app/src/data-source.ts ./src/data-source.ts

# Expose cổng NestJS chạy
EXPOSE 3000

# Environment mặc định
ENV NODE_ENV=production

# Lệnh chạy chính
CMD ["node", "dist/main.js"]
