import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterEntity } from './entitys/character.entity';
import { CharactersService } from './characters.service';
import { StorageModule } from '../object-storage/object-storage.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CharacterEntity]),
        StorageModule
    ],
    providers: [CharactersService],
    exports: [CharactersService],
})
export class CharactersModule { }
