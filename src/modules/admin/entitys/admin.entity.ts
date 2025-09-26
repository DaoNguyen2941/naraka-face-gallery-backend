import { Column, Entity,ManyToOne, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { RoleEntity } from './role.entity';
import { PermissionEntity } from './permission.entity';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @Column({ type: "varchar", nullable: false, unique: true })
  username: string;

  @Column({ type: "varchar", nullable: false })
  passwordHash: string;

  @Column({ type: "varchar", nullable: false, unique: true })
  email: string;

  // @Column({ default: true })
  // isActive: boolean;

  // @ManyToOne(() => RoleEntity, role => role.admin, { eager: true })
  // role: RoleEntity;

  // @ManyToMany(() => PermissionEntity, permission => permission.admin, { eager: true })
  // @JoinTable()
  // permissions: PermissionEntity[];

}
