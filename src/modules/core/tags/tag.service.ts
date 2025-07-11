import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, In  } from 'typeorm';
import { TagEntity } from './entitys/tag.entity';
import { CreateTagDto, UpdateTagDto, DataTagDto } from './dtos';
import slugify from 'slugify';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepo: Repository<TagEntity>,
    ) { }

    async findByIds(ids: string[]): Promise<TagEntity[]> {
        return await this.tagRepo.find({
            where: {
                id: In(ids)
            }
        })
    }

    async findAll(query?: { search?: string }): Promise<TagEntity[]> {
        const where = query?.search
            ? { name: ILike(`%${query.search}%`) }
            : {};
        return this.tagRepo.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<TagEntity> {
        const tag = await this.tagRepo.findOne({ where: { id } });
        if (!tag) {
            throw new NotFoundException('nhãn không tồn tại');
        }
        return tag;
    }

    async create(data: CreateTagDto): Promise<DataTagDto> {
        const existing = await this.tagRepo.findOne({ where: { name: data.name } });
        if (existing) {
            throw new ConflictException(`Nhãn có tên ${data.name} đã tồn tại`);
        }
        const slug = await slugify(data.name, { lower: true });
        const tag = this.tagRepo.create({
            ...data,
            slug: slug
        });

        const newTag = await this.tagRepo.save(tag);

        return plainToInstance(DataTagDto, newTag, {
            excludeExtraneousValues: true,
        })
    }

    async update(id: string, data: UpdateTagDto): Promise<DataTagDto> {
        const tag = await this.findOne(id);

        if (data.name && data.name !== tag.name) {
            const existing = await this.tagRepo.findOne({ where: { name: data.name } });
            if (existing && existing.id !== id) {
                throw new ConflictException(`Tên nhãn: "${data.name}" đã tồn tại`);
            }
            tag.slug = slugify(data.name, { lower: true });
        }

        Object.assign(tag, data);

        const updated = await this.tagRepo.save(tag);
        return plainToInstance(DataTagDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async remove(id: string): Promise<any> {
        const character = await this.findOne(id);
        await this.tagRepo.remove(character);
        
        return {
            messenger: "delete success"
        }
    }

}