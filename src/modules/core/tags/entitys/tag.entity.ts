import { Entity, Column, ManyToMany } from 'typeorm';
import { FaceEntity } from '../../faces/entitys/face.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
@Entity('tags')
export class TagEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToMany(() => FaceEntity, face => face.tags)
  faces: FaceEntity[];
}
