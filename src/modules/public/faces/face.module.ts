import { Module } from '@nestjs/common';
import { FaceModule } from 'src/modules/core/faces/face.moduler';
import { PublicFaceController } from './face.controller';
@Module({
  imports: [FaceModule],
  controllers: [PublicFaceController],
})
export class PublicFaceModule {}
