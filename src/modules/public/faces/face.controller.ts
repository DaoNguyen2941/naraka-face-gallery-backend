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
import { FaceService } from 'src/modules/core/faces/face.service';
import { FacePageOptionsDto } from 'src/modules/core/faces/dtos';
import { PublicFaceDto } from './dtos/publicFace.dto';
import { PageOptionsDto, PageDto } from 'src/common/dtos';
import { plainToInstance } from 'class-transformer';
import { SkipAuth } from 'src/common/decorate/skipAuth';
import { ParamsSlugDto } from 'src/common/dtos';
import { PublicFaceDetails } from './dtos/publicFaceDetails.dto';
import { StorageService } from 'src/modules/core/object-storage/storage.service';
import { Response } from 'express';

@Controller('face')
export class PublicFaceController {
    constructor(
        private readonly faceService: FaceService,
        private readonly storageService: StorageService,
    ) { }

    @Get('/:slug/download')
    @SkipAuth()
    async download(
        @Query('urlFile') urlFile: string,
        @Res() res: Response,
        @Param() params: ParamsSlugDto
    ) {
        const { slug } = params
        return this.storageService.downloadFile(urlFile, res, slug);
    }

    @Get()
    @SkipAuth()
    async gets(@Query() query: FacePageOptionsDto): Promise<PageDto<PublicFaceDto>> {
        const result = await this.faceService.findAll(query);
        return new PageDto(
            plainToInstance(PublicFaceDto, result.data, { excludeExtraneousValues: true }),
            result.meta,
        );
    }

    @Get('/:slug')
    @SkipAuth()
    async get(@Param() params: ParamsSlugDto,): Promise<PublicFaceDetails> {
        const { slug } = params
        const result = await this.faceService.findDetails(slug)
        return plainToInstance(PublicFaceDetails, result, { excludeExtraneousValues: true })
    }
}