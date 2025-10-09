import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('activity_logs')
export class ActivityLogEntity extends BaseEntity {

  @Column({ name: 'admin_id' })
  adminId: string;

  @Column({ name: 'record_id' })
  recordId: string;

  @Column({ type: 'varchar', length: 100 })
  module: string;

  @Column({ type: 'varchar', length: 50 })
  action: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress?: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent?: string;
}
