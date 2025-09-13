import { Injectable } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { TrafficAnalysisEntity } from '../entities/trafficAnalysis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PageTrafficDto } from '../dtos/dailyStatistic.dto';
import { plainToInstance, instanceToPlain } from 'class-transformer';

@Injectable()
export class TrafficAnalysisService {
  constructor(
    @InjectRepository(TrafficAnalysisEntity)
    private readonly trafficRepo: Repository<TrafficAnalysisEntity>,
  ) { }

  async findAll(limit = 30) {
    return this.trafficRepo.find({
      order: { date: 'DESC' },
      take: limit,
    });
  }

  async findByDateRange(date: string):Promise<PageTrafficDto[]> {
    const data = await this.trafficRepo.find({
      where: {
        date: date,
      },
      order: { date: 'ASC' },
    });
    return plainToInstance(PageTrafficDto, data, {
      excludeExtraneousValues: true,
    });
  }

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
      const record = this.trafficRepo.create({ path, date, views, slug: `${path}:${date}` });
      return this.trafficRepo.save(record);
    }
  }

}
