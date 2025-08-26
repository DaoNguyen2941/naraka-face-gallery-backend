import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, In } from 'typeorm';
import { FaceEntity } from './entitys/face.entity';
import { StorageService } from '../object-storage/storage.service';
import { generateFaceStorageKey, createGlobalFaceLock, createCNFaceLock } from 'src/utils/generate-face-key.util';
import slugify from 'slugify';
import { plainToInstance } from 'class-transformer';
import { FileUsage } from '../object-storage/enums/file-usage.enum';
import { CreateFaceDto, DataFaceDto, UpdateFaceDto, GroupFile, FacePageOptionsDto } from './dtos';
import { TagService } from '../tags/tag.service';
import { CharactersService } from '../characters/characters.service';
import { CategoryService } from '../categories/category.service';
import { FileQueueService } from '../queue/service/fileQueue.service';
import { PageDto, PageMetaDto } from 'src/common/dtos';

@Injectable()
export class FaceService {
  constructor(
    @InjectRepository(FaceEntity)
    private readonly faceRepo: Repository<FaceEntity>,
    private readonly tagService: TagService,
    private readonly charactersService: CharactersService,
    private readonly categoryService: CategoryService,
    private readonly storageService: StorageService,
    private readonly fileQueueService: FileQueueService,
  ) { }

  // async findAll(query?: { search?: string }): Promise<FaceEntity[]> {
  //   const where = query?.search
  //     ? { title: ILike(`%${query.search}%`) }
  //     : {};
  //   return this.faceRepo.find({
  //     where,
  //     order: { createdAt: 'DESC' },
  //   });
  // }

async findAll(pageOptionsDto: FacePageOptionsDto): Promise<PageDto<FaceEntity>> {
    const { skip, take, order, tagSlugs, characterSlug } = pageOptionsDto;

    const qb = this.faceRepo.createQueryBuilder("face")
      .leftJoinAndSelect("face.tags", "tag")
      .leftJoinAndSelect("face.character", "character")
      .orderBy("face.createdAt", order);

    // Filter theo tag
    if (tagSlugs?.length) {
      qb.andWhere("tag.slug IN (:...tagSlugs)", { tagSlugs })
        .groupBy("face.id")
        .having("COUNT(DISTINCT tag.slug) = :tagCount", { tagCount: tagSlugs.length });
    }

    // Filter theo character
    if (characterSlug) {
      qb.andWhere("character.slug = :characterSlug", { characterSlug });
    }

    const [entities, total] = await qb.skip(skip).take(take).getManyAndCount();

    return new PageDto(entities, new PageMetaDto({ itemCount: total, pageOptionsDto }));
  }

  async findOne(id: string): Promise<FaceEntity> {
    const character = await this.faceRepo.findOne({ where: { id } });
    if (!character) {
      throw new NotFoundException('QRCode không tồn tại');
    }
    return character;
  }

  async create(
    data: CreateFaceDto,
    fileImageReviews: Express.Multer.File[] = [],
    fileQrCodeGlobals?: Express.Multer.File,
    fileQrCodeCN?: Express.Multer.File,
  ): Promise<FaceEntity> {
    let { characterId, categoryIds, title, tagIds, description, source } = data;

    const [character, tags, categories] = await Promise.all([
      this.charactersService.findOne(characterId),
      tagIds?.length ? this.tagService.findByIds(tagIds) : Promise.resolve([]),
      categoryIds?.length ? this.categoryService.findByIds(categoryIds) : Promise.resolve([]),
    ]);

    const slugCharacter = character.slug;

    if (!title || title.trim() === '') {
      const numberString = Math.floor(Math.random() * 1_000_000)
        .toString()
        .padStart(6, '0');
      title = `QR ${character.name} ${numberString}`;
    }

    const existing = await this.faceRepo.findOne({ where: { title } });
    if (existing) {
      throw new ConflictException(`QR Code với tiêu đề "${title}" đã tồn tại. Hãy đặt tiêu đề khác!`);
    }
    const slug = slugify(title, { lower: true });

    const [qrCodeGlobals, qrCodeCN, imageReviews] = await Promise.all([
      fileQrCodeGlobals
        ? this.storageService.uploadImage(
          fileQrCodeGlobals,
          createGlobalFaceLock(fileQrCodeGlobals.originalname, slugCharacter, slug),
          FileUsage.QR_FACE_GLOBALS
        )
        : undefined,

      fileQrCodeCN
        ? this.storageService.uploadImage(
          fileQrCodeCN,
          createCNFaceLock(fileQrCodeCN.originalname, slugCharacter, slug),
          FileUsage.QR_FACE_CN
        )
        : undefined,

      this.storageService.uploadImageReviews(
        fileImageReviews,
        slugCharacter,
        slug
      )
    ]);

    const qrCodeFace = this.faceRepo.create({
      title,
      description,
      character,
      categories,
      slug,
      tags,
      qrCodeGlobals,
      qrCodeCN,
      imageReviews,
      source
    });

    const newQrCode = await this.faceRepo.save(qrCodeFace);

    // return plainToInstance(DataFaceDto, newQrCode, {
    //   excludeExtraneousValues: true,
    // });
    return newQrCode
  }
  async update(id: string, data: UpdateFaceDto, files: GroupFile)
    : Promise<FaceEntity> {
    const {
      characterId,
      categoryIds,
      title,
      tagIds,
      description,
      source,
    } = data;

    const {
      fileQrCodeCN,
      fileQrCodeGlobals,
      fileImageReviews,
    } = files;

    const [qrCodeFace, existing] = await Promise.all([
      this.findOne(id),
      title
        ? this.faceRepo.findOne({ where: { title } })
        : false
    ])

    if (existing) {
      throw new ConflictException(`QR Code với tiêu đề "${title}" đã tồn tại. Hãy đặt tiêu đề khác!`);
    }

    // Cập nhật title và slug nếu có title mới
    if (title !== undefined) {
      qrCodeFace.title = title;
      qrCodeFace.slug = slugify(title, { lower: true });
    }

    let slugCharacter = qrCodeFace.character?.slug;

    // Nếu có characterId mới → cập nhật
    if (characterId) {
      const character = await this.charactersService.findOne(characterId);
      qrCodeFace.character = character;
      slugCharacter = character.slug;
    }

    // Upload ảnh nếu có
    const [qrCodeGlobals, qrCodeCN, imageReviews] = await Promise.all([
      fileQrCodeGlobals
        ? this.storageService.uploadImage(
          fileQrCodeGlobals,
          createGlobalFaceLock(
            fileQrCodeGlobals.originalname,
            slugCharacter,
            qrCodeFace.slug,
          ),
          FileUsage.QR_FACE_GLOBALS,
        )
        : undefined,

      fileQrCodeCN
        ? this.storageService.uploadImage(
          fileQrCodeCN,
          createCNFaceLock(
            fileQrCodeCN.originalname,
            slugCharacter,
            qrCodeFace.slug,
          ),
          FileUsage.QR_FACE_CN,
        )
        : undefined,

      fileImageReviews?.length
        ? this.storageService.uploadImageReviews(
          fileImageReviews,
          slugCharacter,
          qrCodeFace.slug,
        )
        : undefined,
    ]);

    if (tagIds?.length) {
      qrCodeFace.tags = await this.tagService.findByIds(tagIds);
    }

    if (categoryIds?.length) {
      qrCodeFace.categories = await this.categoryService.findByIds(categoryIds);
    }

    if (description !== undefined) {
      qrCodeFace.description = description;
    }

    if (source !== undefined) {
      qrCodeFace.source = source;
    }

    if (qrCodeCN) {
      qrCodeFace.qrCodeCN = qrCodeCN;
    }

    if (qrCodeGlobals) {
      qrCodeFace.qrCodeGlobals = qrCodeGlobals;
    }

    if (imageReviews) {
      qrCodeFace.imageReviews = imageReviews;
    }

    const updated = await this.faceRepo.save(qrCodeFace);

    // return plainToInstance(DataFaceDto, updated, {
    //   excludeExtraneousValues: true,
    // });

    return updated
  }


  async remove(id: string) {
    const face = await this.faceRepo.findOne({
      where: { id },
      relations: ['imageReviews', 'qrCodeCN', 'qrCodeGlobals'],
    });

    if (!face) throw new NotFoundException('Face not found');

    // enqueue jobs
    if (face.imageReviews?.length) {
      await this.fileQueueService.enqueueDeleteMany(face.imageReviews);
    }
    if (face.qrCodeCN) {
      await this.fileQueueService.enqueueDelete(face.qrCodeCN);
    }
    if (face.qrCodeGlobals) {
      await this.fileQueueService.enqueueDelete(face.qrCodeGlobals);
    }

    await this.faceRepo.remove(face);
    return { message: 'Delete success' };
  }


}
