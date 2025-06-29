import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FaceEntity } from '../../faces/entitys/face.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { FileEntity } from '../../object-storage/entitys/file.entity';
@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => FileEntity, { nullable: true, eager: true, cascade: ['insert'] })
  @JoinColumn({ name: 'file_id' })
  cover_photo?: FileEntity;

  @ManyToMany(() => FaceEntity, face => face.categories)
  faces: FaceEntity[];
}
