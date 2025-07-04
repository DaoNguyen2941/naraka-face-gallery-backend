import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entitys/admin.entity';
import { AdminAuthModule } from './auth/adminAuth.module';
import { AdminCharactersController } from './characters/character.controller';
import { AdminCharactersModule } from './characters/character.module';
import { CharactersModule } from '../core/characters/characters.module';
import { StorageModule } from '../core/object-storage/object-storage.module';
import { CustomRedisModule } from '../core/redis/redis.module';
import { AdminCategoryModule } from './categorys/category.module';
import { AdminFaceModule } from './faces/face.module';
import { AdminTagModule } from './tags/tag.modulle';
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    AdminAuthModule,
    AdminCharactersModule,
    CharactersModule,
    StorageModule,
    CustomRedisModule,
    AdminCategoryModule,
    AdminFaceModule,
    AdminTagModule
  ],
  controllers: [
    AdminController,
    AdminCharactersController
  ],
  providers: [
    AdminService,
  ],
    exports: [AdminService], 
})
export class AdminModule { }