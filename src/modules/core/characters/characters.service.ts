import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CharacterEntity } from './entitys/character.entity';
import { CreateCharacterDto, UpdateCharacterDto } from './dtos';
import { StorageService } from '../object-storage/storage.service';
import {
    generateFaceStorageKey,
    generateCharacterAvatarKey,
} from 'src/utils/generate-face-key.util';
import slugify from 'slugify';

@Injectable()
export class CharactersService {
    constructor(
        @InjectRepository(CharacterEntity)
        private readonly characterRepo: Repository<CharacterEntity>,
        private readonly storageService: StorageService

    ) { }

    async findAll(query?: { search?: string }): Promise<CharacterEntity[]> {
        const where = query?.search
            ? { name: ILike(`%${query.search}%`) }
            : {};
        return this.characterRepo.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<CharacterEntity> {
        const character = await this.characterRepo.findOne({ where: { id } });
        if (!character) {
            throw new NotFoundException('Nhân vật không tồn tại');
        }
        return character;
    }

    async create(data: CreateCharacterDto, file: Express.Multer.File): Promise<any> {
        const existing = await this.characterRepo.findOne({ where: { name: data.name } });
        if (existing) {
            throw new ConflictException(`Nhân vật "${data.name}" đã tồn tại`);
        }
        const slug = slugify(data.name, { lower: true });
        const key = generateCharacterAvatarKey(slug, file.originalname);
        const fileUpload = await this.storageService.uploadImage(file, key)
        const character = this.characterRepo.create({
            ...data,
            avatar: fileUpload.url, // hoặc key nếu bạn muốn lưu path
        });
          return this.characterRepo.save(character);
    }

    async update(id: string, dto: UpdateCharacterDto): Promise<CharacterEntity> {
        const character = await this.findOne(id);

        if (dto.name && dto.name !== character.name) {
            const existing = await this.characterRepo.findOne({ where: { name: dto.name } });
            if (existing && existing.id !== id) {
                throw new ConflictException(`Tên nhân vật "${dto.name}" đã tồn tại`);
            }
        }

        Object.assign(character, dto);
        return this.characterRepo.save(character);
    }

    async remove(id: string): Promise<void> {
        const character = await this.findOne(id);
        await this.characterRepo.remove(character);
    }
}
