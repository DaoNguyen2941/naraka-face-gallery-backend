import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create.dto';
import { Allow } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @Allow()
    cover_photo?: any;
}