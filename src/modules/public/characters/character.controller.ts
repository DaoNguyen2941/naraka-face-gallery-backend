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
    Query
} from '@nestjs/common';
import { CharactersService } from 'src/modules/core/characters/characters.service';
import { plainToInstance } from 'class-transformer';
import { SkipAuth } from 'src/common/decorate/skipAuth';
import { PublicCharacterDto } from './dto/publicCharacter.dto';
@Controller('character')
export class PublicCharacterController {
    constructor(
        private readonly charactersService: CharactersService,
    ) { }

    @Get()
    @SkipAuth()
    async gets(): Promise<PublicCharacterDto> {
        const result = this.charactersService.findAll()
        return plainToInstance(PublicCharacterDto, result, { excludeExtraneousValues: true })
    }
}