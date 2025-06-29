import { Entity, Column, ManyToMany, ManyToOne, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from '../../categories/entitys/category.entity';
import { CharacterEntity } from '../../characters/entitys/character.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { FileEntity } from 'src/modules/core/object-storage/entitys/file.entity';
import { TagEntity } from '../../tags/entitys/tag.entity';

@Entity('faces')
export class FaceEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ManyToOne(() => CharacterEntity, character => character.faces, { eager: true })
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity;

  @ManyToMany(() => CategoryEntity, category => category.faces, { eager: true })
  @JoinTable()
  categories: CategoryEntity[];

  @ManyToMany(() => TagEntity, tag => tag.faces, { eager: true })
  @JoinTable()
  tags: TagEntity[];

  @OneToOne(() => FileEntity, { eager: true, cascade: ['insert'], nullable: true })
  @JoinColumn({ name: 'image_id' }) 
  image: FileEntity;

}
