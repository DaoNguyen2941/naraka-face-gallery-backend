import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CharacterEntity } from './entitys/character.entity';
import { CreateCharacterDto, UpdateCharacterDto, DataCharacterDto } from './dtos';
import { StorageService } from '../object-storage/storage.service';
import {
    generateCharacterAvatarKey,
} from 'src/utils/generate-face-key.util';
import slugify from 'slugify';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { FileUsage } from '../object-storage/enums/file-usage.enum';
import { RedisCacheService } from '../redis/services/cache.service';
@Injectable()
export class CharactersService {
    private readonly CACHE_KEY = 'characters';

    constructor(
        @InjectRepository(CharacterEntity)
        private readonly characterRepo: Repository<CharacterEntity>,
        private readonly storageService: StorageService,
        private readonly cacheService: RedisCacheService

    ) { }

    async findAll(query?: { search?: string }): Promise<DataCharacterDto[]> {
        const search = query?.search ?? '';
        const cacheKey = this.CACHE_KEY;
        const cached = await this.cacheService.getCache<DataCharacterDto[]>(cacheKey);
        if (cached) {
            return cached;
        }
        const where = search ? { name: ILike(`%${search}%`) } : {};
        const list = await this.characterRepo.find({
            where,
            order: { createdAt: 'DESC' },
        });
        const plainList = instanceToPlain(list) as object[];
        const result = plainToInstance(DataCharacterDto, plainList, {
            excludeExtraneousValues: true,
        });
        if (search) {
            return result;
        }
        await this.cacheService.setCache(cacheKey, result);
        return result;
    }

    async findOne(id: string): Promise<CharacterEntity> {
        const character = await this.characterRepo.findOne({ where: { id } });
        if (!character) {
            throw new NotFoundException('Nhân vật không tồn tại');
        }
        return character;
    }

    async create(data: CreateCharacterDto, file: Express.Multer.File): Promise<DataCharacterDto> {
        const existing = await this.characterRepo.findOne({ where: { name: data.name } });
        if (existing) {
            throw new ConflictException(`Nhân vật ${data.name} đã tồn tại`);
        }
        const slug = slugify(data.name, { lower: true });
        const key = generateCharacterAvatarKey(slug, file.originalname);
        const fileUpload = await this.storageService.uploadImage(file, key, FileUsage.CHARACTER_AVATAR)
        const character = this.characterRepo.create({
            ...data,
            avatar: fileUpload,
            slug: slug
        });
        const newCharacter = await this.characterRepo.save(character);
        await this.cacheService.deleteCache(this.CACHE_KEY)
        return plainToInstance(DataCharacterDto, newCharacter, {
            excludeExtraneousValues: true,
        })
    }

    async update(
        id: string,
        data: UpdateCharacterDto,
        file?: Express.Multer.File,
    ): Promise<DataCharacterDto> {
        const character = await this.findOne(id);
        const newName = data.name || character.name;

        if (data.name && data.name !== character.name) {
            const existing = await this.characterRepo.findOne({ where: { name: data.name } });
            if (existing && existing.id !== id) {
                throw new ConflictException(`Tên nhân vật "${data.name}" đã tồn tại`);
            }
        }

        if (file) {
            const slug = slugify(newName, { lower: true });
            const key = generateCharacterAvatarKey(slug, file.originalname);
            const avatar = await this.storageService.uploadImage(file, key, FileUsage.COVER_PHOTO_CATEGORY);
            character.avatar = avatar;
        }
        character.slug = slugify(newName, { lower: true });
        Object.assign(character, data);
        const updated = await this.characterRepo.save(character);
        await this.cacheService.deleteCache(this.CACHE_KEY)
        return plainToInstance(DataCharacterDto, updated, {
            excludeExtraneousValues: true,
        });
    }

    async remove(id: string, soft = true): Promise<{ message: string }> {
        const character = await this.findOne(id);
        if (soft) {
            await this.characterRepo.softDelete(id);
        } else {
            await this.characterRepo.remove(character);
            if (character.avatar) {
                await this.storageService.deleteFile(character.avatar.key);
            }
        }
        await this.cacheService.deleteCache(this.CACHE_KEY);
        return { message: soft ? 'Soft delete success' : 'Hard delete success' };
    }

}
