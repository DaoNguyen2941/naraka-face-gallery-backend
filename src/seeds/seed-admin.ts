// src/seeds/seed-admin.ts
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../modules/admin/entities/admin.entity';
import { config } from 'dotenv';
config(); // Load biến môi trường từ .env

// Khởi tạo DataSource thủ công (không dùng AppModule)
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Admin],
  synchronize: false,
});

async function seedAdmin() {
  await dataSource.initialize();
  const adminRepository = dataSource.getRepository(Admin);

  const email = 'admin@example.com';
  const existing = await adminRepository.findOne({ where: { email } });

  if (existing) {
    console.log('Admin already exists.');
    process.exit(0);
  }

  const password = 'admin123'; // Đổi theo nhu cầu
  const hashed = await bcrypt.hash(password, 10);

  const admin = adminRepository.create({
    email,
    password: hashed,
    username: 'superadmin',
  });

  await adminRepository.save(admin);
  console.log('✅ Admin created:', email);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('❌ Failed to seed admin:', err);
  process.exit(1);
});
