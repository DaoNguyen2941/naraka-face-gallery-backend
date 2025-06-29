import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { FaceEntity } from './entitys/face.entity';
import { StorageService } from '../object-storage/storage.service';
import { generateFaceStorageKey} from 'src/utils/generate-face-key.util';
import slugify from 'slugify';
import { plainToInstance } from 'class-transformer';
import { FileUsage } from '../object-storage/enums/file-usage.enum';
import { CreateFaceDto } from './dtos';

@Injectable()
export class FaceService {
    constructor(
        @InjectRepository(FaceEntity)
        private readonly faceRepo: Repository<FaceEntity>,
        private readonly storageService: StorageService
    ) { }

    async findAll(query?: { search?: string }): Promise<any> {
     
    }

    async findOne(id: string): Promise<any> {

    }

    async create(data: CreateFaceDto, file: Express.Multer.File): Promise<any> {
       
    }

    async update(): Promise<any> {
      
    }


    async remove(id: string): Promise<any> {
      
    }
}
