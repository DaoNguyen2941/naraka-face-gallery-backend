import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('analytics_daily_stats')
export class AnalyticsDailyStatsEntity extends BaseEntity {
  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int', default: 0 })
  pageviews: number;

  @Column({ type: 'int', default: 0 })
  sessions: number;

  @Column({ type: 'int', default: 0 })
  unique_visitors: number;

  @Column({ type: 'int', default: 0 })
  new_visitor: number;
}
