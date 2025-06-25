import { Entity, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { CategoryEntity } from '../../categories/entitys/category.entity';
import { CharacterEntity } from '../../characters/entitys/character.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { FileEntity } from 'src/modules/core/object-storage/entitys/file.entity';
import { TagEntity } from '../../tag/entitys/tag.entity';

@Entity('faces')
export class FaceEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(() => CharacterEntity, character => character.faces, { eager: true })
  character: CharacterEntity;

  @ManyToMany(() => CategoryEntity, category => category.faces, { eager: true })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, tag => tag.faces, { eager: true })
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => FileEntity, { eager: true })
  image: FileEntity;

}
