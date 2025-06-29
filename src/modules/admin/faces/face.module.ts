import { Module } from '@nestjs/common';
import { FaceModule } from 'src/modules/core/faces/face.moduler';
import { AdminFaceController } from './face.controller';

@Module({
  imports: [FaceModule],
  controllers: [AdminFaceController],
})
export class AdminFaceModule {}
