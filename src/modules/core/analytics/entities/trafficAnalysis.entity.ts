import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
@Entity('traffic_analysis')
export class TrafficAnalysisEntity extends BaseEntity {
  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 512 })
  path: string;

  @Column({ type: 'int', default: 0 })
  views: number;
}
