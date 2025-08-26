import { Module } from '@nestjs/common';
import { R2ClientProvider } from './providers/r2.client';
import { StorageService } from './storage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entitys/file.entity'; 
import { QueueModule } from '../queue/queue.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
  ],
  providers: [R2ClientProvider, StorageService],
  exports: [StorageService],
})
export class StorageModule {}
