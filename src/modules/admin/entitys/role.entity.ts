// role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { AdminEntity } from './admin.entity';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string; // ADMIN, SUPERADMIN

    @ManyToMany(() => PermissionEntity, permission => permission.roles, { eager: true })
    @JoinTable()
    permissions: PermissionEntity[];

    // @OneToMany(() => AdminEntity, admin => admin.role)
    // admin: AdminEntity[];
}
