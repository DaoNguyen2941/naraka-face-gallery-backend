import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create.dto';
export class UpdateTagDto extends PartialType(CreateTagDto) {}