import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaceEntity } from './entitys/face.entity';
import { StorageModule } from '../object-storage/object-storage.module';
import { FaceService } from './face.service';
import { CharactersModule } from '../characters/characters.module';
import { TagModule } from '../tags/tag.module';
import { CategoriesModule } from '../categories/categorys.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FaceEntity]),
        StorageModule,
        CharactersModule,
        TagModule,
        CategoriesModule
    ],
    providers: [FaceService],
    exports: [FaceService],
})
export class FaceModule { }
