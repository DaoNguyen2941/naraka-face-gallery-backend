import { Injectable, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogEntity } from './entity/activityLog.entity';
import { CreateActivityLogDto } from './dtos/createActivityLogDto';
import { toVNTime } from 'src/utils/dayjs';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private readonly logRepo: Repository<ActivityLogEntity>,
  ) { }

  async logAction(dto: CreateActivityLogDto) {
    try {
      console.log(4444);
      console.log(dto.adminId);

      const timestamp = toVNTime();
      const slug = `${(dto.description)} / ${timestamp}`;
      const log = this.logRepo.create({
        ...dto,
        slug,
      });

      console.log(log);
      return await this.logRepo.save(log);
    } catch (error) {
      console.error('Create Log failed:', error);
      throw new InternalServerErrorException('Failed to create Log');
    }
  }

}
