import { Module } from '@nestjs/common';
import { PublicFaceModule } from './faces/face.module';
import { PublicCharacterModule } from './characters/character.module';
@Module({
    imports: [
        PublicFaceModule,
        PublicCharacterModule
    ],
    controllers: [
    ],
})
export class PublicModule { }