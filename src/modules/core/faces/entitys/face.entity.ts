import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  OneToOne,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { CharacterEntity } from '../../characters/entitys/character.entity';
import { CategoryEntity } from '../../categories/entitys/category.entity';
import { TagEntity } from '../../tags/entitys/tag.entity';
import { FileEntity } from 'src/modules/core/object-storage/entitys/file.entity';
import { AnalyticsFaceViews } from '../../analytics/entities/analyticsFaceViews.entity';
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

  // Danh sách ảnh review liên quan
  @OneToMany(() => FileEntity, file => file.faceImageReview, {
    eager: true,
    cascade: true,                    // Cho phép chèn và xoá file từ FaceEntity
    orphanedRowAction: 'delete',     // Xoá file khi không còn liên kết
  })
  imageReviews: FileEntity[];

  // QR code tiếng Trung
  @OneToOne(() => FileEntity, {
    eager: true,
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'qrCodeCN_id' })
  qrCodeCN: FileEntity;

  // QR code Global
  @OneToOne(() => FileEntity, {
    eager: true,
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'qrCodeGlobals_id' })
  qrCodeGlobals: FileEntity;

  @Column({ type: 'varchar', nullable: true })
  source: string;

  @OneToMany(() => AnalyticsFaceViews, afv => afv.face)
  analyticsFaceViews: AnalyticsFaceViews[];
}