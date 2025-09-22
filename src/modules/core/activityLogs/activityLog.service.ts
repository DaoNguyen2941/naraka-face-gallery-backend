import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogEntity } from './entity/activityLog.entity';
import { CreateActivityLogDto } from './dtos/createActivityLogDto';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private readonly logRepo: Repository<ActivityLogEntity>,
  ) {}

  async logAction(dto: CreateActivityLogDto) {
    const log = this.logRepo.create(dto);
    return await this.logRepo.save(log);
  }

  async get() {

  }

}
