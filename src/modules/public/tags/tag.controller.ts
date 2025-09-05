import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    ParseFilePipeBuilder,
    HttpStatus,
    Query,
    Res
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SkipAuth } from 'src/common/decorate/skipAuth';
import { PublicTagDto } from './dto/publicTag.dto';
import { ParamsSlugDto } from 'src/common/dtos';
import { Response } from 'express';
import { TagService } from 'src/modules/core/tags/tag.service';

@Controller('tag')
export class PublicTagController {
    constructor(
        private readonly tagService: TagService,
    ) { }

    @Get()
    @SkipAuth()
    async gets(): Promise<PublicTagDto> {
        const result = this.tagService.findAll()
        return plainToInstance(PublicTagDto, result, { excludeExtraneousValues: true })
    }
}