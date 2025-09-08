import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsDailyStatsEntity } from '../entities';

@Injectable()
export class DailyStatisticsService {
    constructor(
        @InjectRepository(AnalyticsDailyStatsEntity)
        private readonly analyticsDailyStatsRepo: Repository<AnalyticsDailyStatsEntity>,
    ) { }

    async save(data: { date: string, pageviews: number, sessions: number, unique_visitors: number, new_visitor: number }) {
        const { date, pageviews, sessions, unique_visitors, new_visitor } = data

        const existing = await this.analyticsDailyStatsRepo.findOne({
            where: { date },
        });

        if (existing) {
            existing.new_visitor += new_visitor;
            existing.unique_visitors = unique_visitors;
            existing.sessions = sessions;
            existing.pageviews += pageviews;
            return this.analyticsDailyStatsRepo.save(existing);
        } else {
            const record = this.analyticsDailyStatsRepo.create({...data, slug: date});
            return this.analyticsDailyStatsRepo.save(record);
        }
    }

}
