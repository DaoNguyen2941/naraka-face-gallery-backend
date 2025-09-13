import { Injectable } from '@nestjs/common';
import { Repository, Between  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsDailyStatsEntity } from '../entities';

@Injectable()
export class DailyStatisticsService {
    constructor(
        @InjectRepository(AnalyticsDailyStatsEntity)
        private readonly analyticsDailyStatsRepo: Repository<AnalyticsDailyStatsEntity>,
    ) { }

    async findAll(limit = 30) {
        return this.analyticsDailyStatsRepo.find({
            order: { date: 'DESC' },
            take: limit,
        });
    }

    async findByDateRange(start: string, end: string) {
        return this.analyticsDailyStatsRepo.find({
            where: {
                date: Between(start, end),
            },
            order: { date: 'ASC' },
        });
    }

    async save(data: { date: string, pageviews: number, sessions: number, unique_visitors: number, new_visitor: number }) {
        const { date, pageviews, sessions, unique_visitors, new_visitor } = data

        const existing = await this.analyticsDailyStatsRepo.findOne({
            where: { date },
        });

        if (existing) {
            existing.new_visitor = new_visitor;
            existing.unique_visitors = unique_visitors;
            existing.sessions = sessions;
            existing.pageviews += pageviews;
            return this.analyticsDailyStatsRepo.save(existing);
        } else {
            const record = this.analyticsDailyStatsRepo.create({ ...data, slug: date });
            return this.analyticsDailyStatsRepo.save(record);
        }
    }

}
