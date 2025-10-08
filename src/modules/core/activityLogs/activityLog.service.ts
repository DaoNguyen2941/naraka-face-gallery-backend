import { Injectable, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogEntity } from './entity/activityLog.entity';
import { CreateActivityLogDto } from './dtos/createActivityLogDto';
import { toVNTime } from 'src/utils/dayjs';
import { GetActivityLogsDto } from './dtos/getActivityLogs.dto';
import { PageDto, PageMetaDto } from 'src/common/dtos';
@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private readonly logRepo: Repository<ActivityLogEntity>,
  ) { }

  async logAction(dto: CreateActivityLogDto) {
    try {
      console.log(dto);

      const timestamp = toVNTime();
      const slug = `${(dto.description)} / ${timestamp}`;
      const log = this.logRepo.create({
        ...dto,
        slug,
      });
      return await this.logRepo.save(log);
    } catch (error) {
      console.error('Create Log failed:', error);
      throw new InternalServerErrorException('Failed to create Log');
    }
  }

  async findAll(dto: GetActivityLogsDto): Promise<PageDto<ActivityLogEntity>> {
    const { adminId, module, action, fromDate, toDate, order } = dto;

    const qb = this.logRepo
      .createQueryBuilder('log')
      .orderBy('log.createdAt', order)
      .skip(dto.skip)
      .take(dto.take);

    if (adminId) {
      qb.andWhere('log.adminId = :adminId', { adminId });
    }

    if (module) {
      qb.andWhere('log.module = :module', { module });
    }

    if (action) {
      qb.andWhere('log.action = :action', { action });
    }

    if (fromDate) {
      qb.andWhere('log.createdAt >= :fromDate', { fromDate });
    }

    if (toDate) {
      const nextDay = new Date(toDate);
      nextDay.setDate(nextDay.getDate() + 1);
      nextDay.setHours(0, 0, 0, 0);
      qb.andWhere('log.createdAt < :nextDay', { nextDay });
    }

    const [data, itemCount] = await qb.getManyAndCount();
    const meta = new PageMetaDto({ pageOptionsDto: dto, itemCount });
    return new PageDto(data, meta);
  }


}
