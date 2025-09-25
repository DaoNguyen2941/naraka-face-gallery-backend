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
import { createImageReviewLock } from 'src/utils/generate-face-key.util';
import { Response } from 'express';

@Injectable()
export class StorageService {
  private readonly bucketName: string;
  private readonly publicUrl: string;

  constructor(
    @InjectRepository(FileEntity)
    private readonly filesRepository: Repository<FileEntity>,
    @Inject('R2_S3_CLIENT')
    private readonly s3: S3Client,

    private readonly configService: ConfigService,
  ) {
    this.bucketName = this.configService.get<string>('cfR2.bucketName')!;
    this.publicUrl = this.configService.get<string>('cfR2.publicUrl')!;
  }

  async downloadFile(url: string, res: Response, filename?: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

      const contentType = response.headers.get('content-type') || 'application/octet-stream';
      const buffer = Buffer.from(await response.arrayBuffer());

      res.setHeader('Content-Type', contentType);
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename || 'downloaded-file'}"`,
      );

      res.send(buffer);
    } catch (error) {
      console.error('Download proxy failed:', error);
      throw new InternalServerErrorException('Failed to download file');
    }
  }

  async uploadImageReviews(files: Express.Multer.File[], characterSlug: string, qrSlug: string,): Promise<FileEntity[]> {
    if (!files || files.length === 0) return [];
    const uploadTasks = files.map(async (file) => {
      const generatedKey = createImageReviewLock(file.originalname, characterSlug, qrSlug)
      return this.uploadImage(file, generatedKey, FileUsage.IMAGE_REVIEW);
    });
    const results = await Promise.allSettled(uploadTasks);
    const uploadedFiles: FileEntity[] = [];
    results.forEach((result, index) => {
      const originalName = files[index]?.originalname;
      if (result.status === 'fulfilled') {
        uploadedFiles.push(result.value);
      } else {
        console.warn(`❌ Failed to upload "${originalName}": ${result.reason?.message || result.reason}`);
      }
    });

    return uploadedFiles;
  }



  async uploadImage(file: Express.Multer.File, key?: string, usage?: FileUsage) {
    try {
      const bucketName = this.bucketName
      const publicUrl = this.publicUrl
      const cleanName = slugify(file.originalname)
      const finalKey =
        key ||
        `images/${new Date().toISOString().split('T')[0]}/${uuidv4()}-${cleanName}`;

       await this.s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: finalKey,
          Body: file.buffer,
          ContentType: file.mimetype,
          ContentDisposition: `inline; filename="${cleanName}"`,
          CacheControl: 'no-cache, no-store, must-revalidate'
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
