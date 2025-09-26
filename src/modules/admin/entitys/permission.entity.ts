// permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { AdminEntity } from './admin.entity';

@Entity('permission')
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // ex: CAN_EDIT_USER, CAN_DELETE_POST

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => RoleEntity, role => role.permissions)
  roles: RoleEntity[];

//   @ManyToMany(() => AdminEntity, admin => admin.permissions)
//   admin: AdminEntity[];
}
