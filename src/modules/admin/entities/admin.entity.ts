import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column({ type: "varchar", nullable: false, unique: true })
  username: string;

  @Column({ type: "varchar", nullable: false })
  passwordHash: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
