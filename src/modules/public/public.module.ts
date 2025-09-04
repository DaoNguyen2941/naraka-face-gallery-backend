import { Module } from '@nestjs/common';
import { PublicFaceModule } from './faces/face.module';

@Module({
    imports: [
        PublicFaceModule
    ],
    controllers: [
    ],
})
export class PublicModule { }