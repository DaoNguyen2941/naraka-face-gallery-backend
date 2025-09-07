import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrafficAnalysisEntity } from '../entities/trafficAnalysis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisCacheService } from '../../redis/services/cache.service';

@Injectable()
export class TrafficAnalysisService {
  constructor(
    @InjectRepository(TrafficAnalysisEntity)
    private readonly trafficRepo: Repository<TrafficAnalysisEntity>,
  ) {}

  /**
   * Lưu hoặc cộng dồn record traffic analysis
   */
  async savePageview(path: string, date: string, views: number) {
    const existing = await this.trafficRepo.findOne({
      where: { path, date },
    });

    if (existing) {
      existing.views += views;
      return this.trafficRepo.save(existing);
    } else {
      const record = this.trafficRepo.create({ path, date, views, slug:path});
      return this.trafficRepo.save(record);
    }
  }
  
}
