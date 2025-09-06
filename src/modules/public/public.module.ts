import { Module } from '@nestjs/common';
import { PublicFaceModule } from './faces/face.module';
import { PublicCharacterModule } from './characters/character.module';
import { PublicTagModule } from './tags/tag.module';
import { PublicAnalyticsModule } from './Analytics/Analytics.module';
@Module({
    imports: [
        PublicFaceModule,
        PublicCharacterModule,
        PublicTagModule,
        PublicAnalyticsModule
    ],
    controllers: [
    ],
})
export class PublicModule { }