import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { FaceEntity } from './entitys/face.entity';
import { StorageService } from '../object-storage/storage.service';
import { generateFaceStorageKey } from 'src/utils/generate-face-key.util';
import slugify from 'slugify';
import { plainToInstance } from 'class-transformer';
import { FileUsage } from '../object-storage/enums/file-usage.enum';
import { CreateFaceDto, DataFaceDto, UpdateFaceDto } from './dtos';
import { TagService } from '../tags/tag.service';
import { CharactersService } from '../characters/characters.service';
import { CategoryService } from '../categories/category.service';
@Injectable()
export class FaceService {
  constructor(
    @InjectRepository(FaceEntity)
    private readonly faceRepo: Repository<FaceEntity>,
    private readonly tagService: TagService,
    private readonly charactersService: CharactersService,
    private readonly categoryService: CategoryService,
    private readonly storageService: StorageService

  ) { }

  async findAll(query?: { search?: string }): Promise<FaceEntity[]> {
    const where = query?.search
      ? { title: ILike(`%${query.search}%`) }
      : {};
    return this.faceRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<FaceEntity> {
    const character = await this.faceRepo.findOne({ where: { id } });
    if (!character) {
      throw new NotFoundException('QRCode không tồn tại');
    }
    return character;
  }

  async create(data: CreateFaceDto, file: Express.Multer.File): Promise<DataFaceDto> {
    let { characterId, categoryIds, title, tagIds, description } = data;

    if (!title || title.trim() === '') {
      const character = await this.charactersService.findOne(characterId);
      const numberString = Math.floor(Math.random() * 1_000_000)
        .toString()
        .padStart(6, '0');
      title = `QR ${character.name} ${numberString}`;
    }

    const existing = await this.faceRepo.findOne({ where: { title: title } });
    if (existing) {
      throw new ConflictException(`Qr-Code có tiêu đề "${title}" đã tồn tại. Hãy đặt title khác!`);
    }
    const character = await this.charactersService.findOne(characterId);
    const tags = tagIds?.length ? await this.tagService.findByIds(tagIds) : [];
    const categories = categoryIds?.length ? await this.categoryService.findByIds(categoryIds) : []
    const slug = slugify(title, { lower: true });
    const key = generateFaceStorageKey(file.originalname, character.slug)
    const image = await this.storageService.uploadImage(file, key, FileUsage.FACE_IMAGE)
    const qrCodeFace = this.faceRepo.create({
      title,
      description,
      character,
      categories,
      slug,
      tags,
      image
    })
    const newQrCode = this.faceRepo.save(qrCodeFace)
    console.log(newQrCode);

    return plainToInstance(DataFaceDto, newQrCode, {
      excludeExtraneousValues: true,
    })
  }

  async update(id: string, data: UpdateFaceDto): Promise<DataFaceDto> {
    const { characterId, categoryIds, title, tagIds, description } = data;

    const qrCodeFace = await this.findOne(id);

    const titleNew = title ?? qrCodeFace.title;
    qrCodeFace.title = titleNew;
    qrCodeFace.slug = slugify(titleNew, { lower: true });

    if (characterId) {
      qrCodeFace.character = await this.charactersService.findOne(characterId);
    }

    if (tagIds?.length) {
      qrCodeFace.tags = await this.tagService.findByIds(tagIds);
    }

    if (categoryIds?.length) {
      qrCodeFace.categories = await this.categoryService.findByIds(categoryIds);
    }

    if (description !== undefined) {
      qrCodeFace.description = description;
    }

    const updated = await this.faceRepo.save(qrCodeFace);

    return plainToInstance(DataFaceDto, updated, {
      excludeExtraneousValues: true,
    });
  }



  async remove(id: string): Promise<any> {
    const qrCodeFace = await this.findOne(id);
    await this.faceRepo.remove(qrCodeFace)
    await this.storageService.deleteFile(qrCodeFace.image.key)
    return {
      messenger: "delete success"
    }
  }
}
