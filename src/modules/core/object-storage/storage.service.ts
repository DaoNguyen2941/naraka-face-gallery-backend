import { Injectable, Inject, InternalServerErrorException, HttpException, HttpStatus } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { FileEntity } from './entitys/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FileUsage } from './enums/file-usage.enum';
import { randomUUID } from 'crypto';
import slugify from 'slugify';

@Injectable()
export class StorageService {

  constructor(
    @InjectRepository(FileEntity)
    private filesRepository: Repository<FileEntity>,
    @Inject('R2_S3_CLIENT') private readonly s3: S3Client,
    private readonly configService: ConfigService,
  ) { }

  async uploadImage(file: Express.Multer.File, key?: string, usage?: FileUsage) {
    try {
      const bucketName = this.configService.get('cfR2.bucketName');
      const publicUrl = this.configService.get('cfR2.publicUrl');
      const cleanName = slugify(file.originalname)
      const finalKey =
        key ||
        `images/${new Date().toISOString().split('T')[0]}/${uuidv4()}-${cleanName}`;

      const upload = await this.s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: finalKey,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentDisposition: `inline; filename="${cleanName}"`,
        }),
      );

      const url = `${publicUrl}/${finalKey}`;
      const uuid = randomUUID();

      const dataFile = this.filesRepository.create({
        id: uuid,
        key: finalKey,
        url: url,
        type: file.mimetype,
        size: file.size,
        originalName: cleanName,
        usage: usage,
        slug: uuid
      });

      const savedFile = await this.filesRepository.save(dataFile);
      return savedFile;

    } catch (error) {
      console.error('Upload image failed:', error);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      console.log(key);
      
      const bucketName = this.configService.get('cfR2.bucketName');
      // 1. Xóa trên R2
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: key,
        }),
      );

      await this.filesRepository.delete({ key });
    } catch (error) {
      console.error('Delete image failed:', error);
      throw new InternalServerErrorException('Failed to delete image');
    }
  }

}
