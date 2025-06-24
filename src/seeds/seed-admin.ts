// src/seeds/seed-admin.ts
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AdminEntity } from '../modules/admin/entities/admin.entity';
import { config } from 'dotenv';
config(); // Load biến môi trường từ .env

// Khởi tạo DataSource thủ công (không dùng AppModule)
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [AdminEntity],
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
