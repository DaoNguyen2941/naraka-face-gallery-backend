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
import { ActivityQueueService } from '../queue/service/activityQueue.service';
import { ActivityAction, ActivityModule } from '../activityLogs/enums';
import { pick } from 'lodash';
import { ContextLogDto } from '../activityLogs/dtos/context.dto';
@Injectable()
export class CharactersService {
    private readonly CACHE_KEY = 'characters';

    constructor(
        @InjectRepository(CharacterEntity)
        private readonly characterRepo: Repository<CharacterEntity>,
        private readonly storageService: StorageService,
        private readonly cacheService: RedisCacheService,
        private readonly activityQueueService: ActivityQueueService,

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

    async create(
        data: CreateCharacterDto,
        file: Express.Multer.File,
        context: ContextLogDto,
    ): Promise<DataCharacterDto> {
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
            slug: slug,
            createdBy: context.adminId
        });
        const newCharacter = await this.characterRepo.save(character);

        await this.activityQueueService.enqueueCreateLog({
            adminId: context.adminId,
            module: ActivityModule.CHARACTER,
            action: ActivityAction.CREATE,
            description: `Tạo mới nhân vật ${newCharacter.name}`,
            metadata: { after: newCharacter },
            ipAddress: context.ipAddress,
            userAgent: context.userAgent,
        });
        await this.cacheService.deleteCache(this.CACHE_KEY)
        return plainToInstance(DataCharacterDto, newCharacter, {
            excludeExtraneousValues: true,
        })
    }

    async update(
        id: string,
        data: UpdateCharacterDto,
        context: ContextLogDto,
        file?: Express.Multer.File,
    ): Promise<DataCharacterDto> {
        // 1️⃣ Lấy nhân vật và clone dữ liệu trước khi thay đổi
        const character = await this.characterRepo.findOne({ where: { id } });
        if (!character) {
            throw new ConflictException(`Nhân vật với id ${id} không tồn tại`);
        }
        const beforeUpdate = { ...character }; // shallow clone, đủ cho log

        // 2️⃣ Kiểm tra trùng tên
        const newName = data.name || character.name;
        if (data.name && data.name !== character.name) {
            const existing = await this.characterRepo.findOne({ where: { name: data.name } });
            if (existing && existing.id !== id) {
                throw new ConflictException(`Tên nhân vật "${data.name}" đã tồn tại`);
            }
        }

        // 3️⃣ Upload avatar nếu có
        if (file) {
            const slug = slugify(newName, { lower: true });
            const key = generateCharacterAvatarKey(slug, file.originalname);
            const avatar = await this.storageService.uploadImage(file, key, FileUsage.CHARACTER_AVATAR);
            character.avatar = avatar;
        }

        // 4️⃣ Cập nhật slug và các field khác
        character.slug = slugify(newName, { lower: true });
        Object.assign(character, data);
        character.updatedBy = context.adminId

        // 5️⃣ Lưu vào DB
        const updated = await this.characterRepo.save(character);

        // 6️⃣ Gửi log vào queue
        await this.activityQueueService.enqueueCreateLog({
            adminId: context.adminId,
            module: ActivityModule.CHARACTER,
            action: ActivityAction.UPDATE,
            description: `Update nhân vật ${updated.name}`,
            metadata: {
                before: pick(beforeUpdate, ['id', 'name', 'slug', 'avatar']),
                after: pick(updated, ['id', 'name', 'slug', 'avatar']),
            },
            ipAddress: context?.ipAddress,
            userAgent: context?.userAgent,
        });

        // 7️⃣ Xóa cache
        await this.cacheService.deleteCache(this.CACHE_KEY);

        // 8️⃣ Trả về DTO
        return plainToInstance(DataCharacterDto, updated, { excludeExtraneousValues: true });
    }

    async remove(id: string,
        context: ContextLogDto,
        soft = true,
    ): Promise<{ message: string }> {
        const character = await this.findOne(id);
        if (soft) {
            await this.characterRepo.softDelete(id);
        } else {
            await this.characterRepo.remove(character);
            if (character.avatar) {
                await this.storageService.deleteFile(character.avatar.key);
            }
        }
        await this.activityQueueService.enqueueCreateLog({
            adminId: context.adminId,
            module: ActivityModule.CHARACTER,
            action: ActivityAction.DELETE,
            description: soft? `Xóa mềm nhân vật ${character.name}`: `Xóa sạch nhân vật ${character.name}`,
            metadata: {
                before: character,
                after: {
                    softDelete: character.deletedAt
                }
            },
            ipAddress: context?.ipAddress,
            userAgent: context?.userAgent,
        });
        await this.cacheService.deleteCache(this.CACHE_KEY);
        return { message: soft ? 'Soft delete success' : 'Hard delete success' };
    }

}
