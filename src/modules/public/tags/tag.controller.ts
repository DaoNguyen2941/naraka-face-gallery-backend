import {
    Controller,
    Get,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { SkipAuth } from 'src/common/decorate/skipAuth';
import { PublicTagDto } from './dto/publicTag.dto';
import { TagService } from 'src/modules/core/tags/tag.service';
import * as Sentry from "@sentry/nestjs"

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