import { registerAs } from "@nestjs/config";
import { readSecret } from '../readSecret';

export default registerAs('db', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: readSecret('db_password', process.env.DB_PASSWORD),
  database: process.env.DATABASE_NAME
}));