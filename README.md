# 🎭 Naraka QR Face Gallery - Backend (NestJS)

Backend API cho dự án **Naraka QR Face Gallery**, cung cấp hệ thống quản lý và phân phối nội dung cho ứng dụng web hiển thị mã QR khuôn mặt nhân vật trong game **Naraka: Bladepoint**.  

Dự án bao gồm hai phần chính:

- **Public API** — phục vụ cho người dùng xem ảnh, tìm kiếm và lọc dữ liệu nhân vật.
- **Admin API** — dành cho quản trị viên để quản lý nhân vật, khuôn mặt (QR), kiểu tóc, tag, album, v.v.

---

## 🚀 Công nghệ chính

| Thành phần | Mô tả |
|-------------|-------|
| **Framework** | [NestJS](https://nestjs.com/) |
| **Database ORM** | [TypeORM](https://typeorm.io/) |
| **Database** | MySQL |
| **Cache & Queue** | Redis, BullMQ |
| **Authentication** | Passport (JWT + Local Strategy) |
| **Storage** | cloudflare R2 (qua module `object-storage`) |
| **Validation** | class-validator, class-transformer |
| **Logging** | Winston + Daily Rotate File |
| **Scheduling** | @nestjs/schedule |
| **Monitoring** | Sentry.io |
| **Configuration** | @nestjs/config + Joi schema |

---

## 🧩 Cấu trúc dự án

```
src/
├── main.ts                   # Entry point
├── app.module.ts             # Root module
├── config/                   # Cấu hình (DB, Redis, AWS, JWT, Sentry, ...)
├── core/                     # Logic, service, decorator, guard dùng chung
├── modules/
│   ├── admin/                # API dành cho admin
│   ├── public/               # API public (người dùng)
│   ├── auth/                 # Xác thực, JWT, Passport
│   ├── object-storage/       # Module lưu trữ file (AWS S3)
│   ├── core/                 # Các tiện ích và base module
│   └── ...                   # Các module khác (character, face, hairstyle, tag, album)
├── database/
│   ├── migrations/           # TypeORM migrations
│   └── ...                   # module
├── seeds/
│   └── seed-admin.ts         # Script tạo tài khoản admin mặc định
└── data-source.ts            # Cấu hình TypeORM
```

---

## ⚙️ Cài đặt & Chạy dự án

### 1️⃣ Cài đặt dependencies

```bash
npm install
```

### 2️⃣ Tạo file `.env`

```bash
cp .env.example .env
```

Ví dụ cấu hình:

```env
DATABASE_URL=mysql://root:password@localhost:3306/narakaqrface
REDIS_URL=redis://localhost:6379
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=narakaqrface
JWT_SECRET=supersecret
SENTRY_DSN=...
```

### 3️⃣ Chạy migration

```bash
npm run typeorm:run-migrations
```

Tạo migration mới:

```bash
npm run typeorm:generate-migration --name=add_faces_table
```

### 4️⃣ Seed tài khoản admin

```bash
npm run seed:admin
```

### 5️⃣ Chạy server

**Dev mode:**

```bash
npm run start:dev
```

**Production mode:**

```bash
npm run build
npm run start:prod
```

---

## 📜 Các lệnh hữu ích

| Lệnh | Mô tả |
|------|--------|
| `npm run start:dev` | Chạy app ở chế độ watch |
| `npm run build` | Build TypeScript sang JS |
| `npm run seed:admin` | Tạo tài khoản admin mặc định |
| `npm run typeorm:run-migrations` | Chạy migration |
| `npm run typeorm:revert-migration` | Hoàn tác migration |
| `npm run lint` | Kiểm tra và fix lỗi ESLint |
| `npm run format` | Format code bằng Prettier |
| `npm run test` | Chạy test đơn vị |
| `npm run test:e2e` | Chạy test end-to-end |
| `npm run sentry:sourcemaps` | Upload sourcemap lên Sentry |

---

## ☁️ Triển khai Production

1. Build project:
   ```bash
   npm run build
   ```
2. Cấu hình biến môi trường production (`.env` hoặc Docker env vars)
3. Chạy:
   ```bash
   npm run start:prod
   ```

---

## 🛳️ (Tùy chọn) Deploy bằng Docker Compose

```yaml
version: '3.9'
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: myDatabase
    ports:
      - "3306:3306"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mysql
      - redis
    env_file:
      - .env
```

---

## 📈 Tích hợp với Frontend

Frontend được xây dựng bằng **Next.js App Router** + **shadcn/ui**, giao tiếp với backend qua REST API:

- `/api/public/...` — endpoint công khai
- `/api/admin/...` — endpoint dành cho quản trị viên (có JWT)

---

## 👤 Tác giả

**Naraka QR Face Gallery Backend**  
Developed by [Nguyen Van Dao](mailto:daonguyen2941@gmail.com)

---

## 🧾 License

This project is **UNLICENSED** — chỉ dành cho mục đích phát triển nội bộ.

---
