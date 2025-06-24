import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column()
  key: string; // key trong S3 hoặc R2

  @Column()
  url: string; // public URL (hoặc signed URL)

  @Column({ nullable: true })
  type?: string; // ví dụ: image/png, application/zip

  @Column({ nullable: true })
  size?: number; // dung lượng (bytes)

  @Column({ nullable: true })
  originalName?: string; // tên file gốc khi upload

  @Column({ nullable: true })
  usage?: string; // ví dụ: 'face_image', 'character_avatar'

}
