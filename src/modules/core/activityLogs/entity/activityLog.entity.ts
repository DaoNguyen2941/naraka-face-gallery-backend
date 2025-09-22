import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('activity_logs')
export class ActivityLogEntity extends BaseEntity {

  @Column({ name: 'admin_id' })
  adminId: string;

  @Column({ type: 'varchar', length: 100 })
  module: string; 
  // Ví dụ: "character", "face", "hairstyle", "album", "tag", "auth"

  @Column({ type: 'varchar', length: 50 })
  action: string;
  // Ví dụ: "create", "update", "delete", "login", "logout"

  @Column({ type: 'text', nullable: true })
  description?: string;
  // Ghi chi tiết: "Created character Yoto Hime", "Deleted face #123"

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;
  // Lưu dữ liệu trước/sau khi thay đổi

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;
}
