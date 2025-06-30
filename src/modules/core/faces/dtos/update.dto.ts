import { PartialType } from '@nestjs/mapped-types';
import { CreateFaceDto } from './create.dto';

export class UpdateFaceDto extends PartialType(CreateFaceDto) {}