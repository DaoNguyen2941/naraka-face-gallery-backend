import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FaceEntity } from '../../faces/entitys/face.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  cover_photo: string;

  @ManyToMany(() => FaceEntity, face => face.categories)
  faces: FaceEntity[];
}
