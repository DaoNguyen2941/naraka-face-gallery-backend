import { Module } from '@nestjs/common';
import { PublicFaceModule } from './faces/face.module';
import { PublicCharacterModule } from './characters/character.module';
import { PublicTagModule } from './tags/tag.module';

@Module({
    imports: [
        PublicFaceModule,
        PublicCharacterModule,
        PublicTagModule
    ],
    controllers: [
    ],
})
export class PublicModule { }