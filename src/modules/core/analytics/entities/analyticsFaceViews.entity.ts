// src/modules/analytics/entities/analytics-face-views.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FaceEntity } from '../../faces/entitys/face.entity';
import { BaseEntity } from '../../../../common/entities/base.entity';

@Entity('analytics_face_views')
export class AnalyticsFaceViewsEntity extends BaseEntity {
  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'bigint' })
  face_id: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @ManyToOne(() => FaceEntity, face => face.analyticsFaceViews)
  @JoinColumn({ name: 'face_id' })
  face: FaceEntity;
}
