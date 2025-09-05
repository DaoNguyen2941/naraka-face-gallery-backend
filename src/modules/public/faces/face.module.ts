import { Module } from '@nestjs/common';
import { FaceModule } from 'src/modules/core/faces/face.moduler';
import { PublicFaceController } from './face.controller';
import { StorageModule } from 'src/modules/core/object-storage/object-storage.module';
@Module({
  imports: [FaceModule,StorageModule],
  controllers: [PublicFaceController],
})
export class PublicFaceModule {}
