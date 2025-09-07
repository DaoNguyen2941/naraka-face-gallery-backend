// src/modules/analytics/analytics.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisCacheService } from '../../redis/services/cache.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsFaceViews } from '../entities/analyticsFaceViews.entity';
import { Repository } from 'typeorm';
import { FaceService } from '../../faces/face.service';

@Injectable()
export class FaceViewsService {
    constructor(
        @InjectRepository(AnalyticsFaceViews)
        private readonly faceViewsRepo: Repository<AnalyticsFaceViews>,
        private readonly faceService: FaceService,

    ) { }

    async getByFaceSlug(slug: string) {
        const faceView = await this.faceViewsRepo.findOne({ where: { slug } });
        if (!faceView) {
            throw new NotFoundException('QRCode không tồn tại');
        }
        return faceView;
    
}

    /**
     * Lưu hoặc cập nhật số lượt xem face trong ngày
     */
    async saveFaceView(slug: string, date: string, views: number) {
    // 1️⃣ Lấy faceId từ slug
    const face = await this.faceService.findDetails(slug);
    if (!face) {
        return null;
    }

    const faceId = face.id;

    // 2️⃣ Kiểm tra record analytics_face_views
    const existing = await this.faceViewsRepo.findOne({
        where: { face_id: faceId, date },
    });

    if (existing) {
        existing.views += views;
        return this.faceViewsRepo.save(existing);
    } else {
        const record = this.faceViewsRepo.create({ face_id: faceId, date, views, slug: slug });
        return this.faceViewsRepo.save(record);
    }
}


    /**
     * Lấy top N face trong ngày
     */
    async getTopFaces(date: string, limit = 10) {
    return this.faceViewsRepo.createQueryBuilder('f')
        .where('f.date = :date', { date })
        .orderBy('f.views', 'DESC')
        .limit(limit)
        .getMany();
}

}
