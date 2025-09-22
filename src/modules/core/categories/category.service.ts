import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { CategoryEntity } from './entitys/category.entity';
import { Repository, ILike, In } from 'typeorm';
import { StorageService } from '../object-storage/storage.service';
import { CreateCategoryDto, UpdateCategoryDto, DataCategoryDto } from './dtos';
import slugify from 'slugify';
import { generateCategoryKet } from 'src/utils/generate-face-key.util';
import { FileUsage } from '../object-storage/enums/file-usage.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly CategoryRepo: Repository<CategoryEntity>,
        private readonly storageService: StorageService
    ) { }

    async findByIds(ids: string[]): Promise<CategoryEntity[]> {
        return await this.CategoryRepo.find({
            where: {
                id: In(ids)
            }
        })
    }

    async findAll(query?: { search?: string }): Promise<CategoryEntity[]> {
        const where = query?.search
            ? { name: ILike(`%${query.search}%`) }
            : {};
        return this.CategoryRepo.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }

    async create(data: CreateCategoryDto, file: Express.Multer.File): Promise<DataCategoryDto> {
        const existing = await this.CategoryRepo.findOne({
            where: { name: data.name }
        })
        if (existing) {
            throw new ConflictException(`thể loại  ${data.name} đã tồn tại`);
        }
        const slug = slugify(data.name, { lower: true });
        const key = generateCategoryKet(slug, file.originalname);
        const fileUpload = await this.storageService.uploadImage(file, key, FileUsage.COVER_PHOTO_CATEGORY)
        const category = this.CategoryRepo.create({
            ...data,
            cover_photo: fileUpload,
            slug
        })
        const newCategory = await this.CategoryRepo.save(category)
        return plainToInstance(DataCategoryDto, newCategory, {
            excludeExtraneousValues: true,
        })
    }

    async findOne(id: string): Promise<CategoryEntity> {
        const category = await this.CategoryRepo.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException('Thể loại không tồn tại');
        }
        return category;
    }

    async update(
        id: string,
        data: UpdateCategoryDto,
        file?: Express.Multer.File,
    ): Promise<DataCategoryDto> {
        const category = await this.findOne(id);
        const newName = data.name || category.name;
        delete data.cover_photo;

        if (file) {
            const slug = slugify(newName, { lower: true });
            const key = generateCategoryKet(slug, file.originalname);
            const imgUpload = await this.storageService.uploadImage(file, key);
            category.cover_photo = imgUpload;
        }
        category.slug = slugify(newName, { lower: true })
        Object.assign(category, data);
        const updated = await this.CategoryRepo.save(category);
        console.log(updated);

        return plainToInstance(DataCategoryDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async remove(id: string, soft = true): Promise<{ message: string }> {
        const category = await this.findOne(id);

        if (soft) {
            await this.CategoryRepo.softDelete(id);
        } else {
            await this.CategoryRepo.remove(category);
            if (category.cover_photo) {
                await this.storageService.deleteFile(category.cover_photo.key);
            }
        }
        return { message: soft ? 'Soft delete success' : 'Hard delete success' };
    }


}