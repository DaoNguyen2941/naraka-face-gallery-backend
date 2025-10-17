// src/seeds/seed-admin.ts
import { AdminEntity } from '../modules/admin/entitys/admin.entity';
import { config } from 'dotenv';
config(); 

import dataSource from '../data-source'; // ✅ Dùng đường dẫn tương đối
import { hashData } from '../utils/hashData';

async function seedAdmin() {
  await dataSource.initialize();
  const adminRepository = dataSource.getRepository(AdminEntity);

  const email = process.env.ADMIN_EMAIL;
  if (!email) throw new Error('Missing ADMIN_EMAIL in .env');

  const existing = await adminRepository.findOne({ where: { email } });
  if (existing) {
    console.log('⚠️ Admin already exists.');
    process.exit(0);
  }

  const password = process.env.ADMIN_PASSWORD!;
  if (!password) throw new Error('Missing ADMIN_PASSWORD in .env');

  const hashed = await hashData(password);

  const admin = adminRepository.create({
    email,
    passwordHash: hashed,
    username: process.env.ADMIN_NAME || 'Admin',
    slug: 'admin',
  });

  await adminRepository.save(admin);
  console.log('✅ Admin created successfully:', email);
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('❌ Failed to seed admin:', err);
  process.exit(1);
});
