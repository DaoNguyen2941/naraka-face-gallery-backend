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

    @Get("/debug-sentry")
    @SkipAuth()
    getError() {
        // Send a log before throwing the error
        Sentry.logger.info('User triggered test error', {
            action: 'test_error_endpoint',
        });
        throw new Error("My first Sentry error!");
    }
}