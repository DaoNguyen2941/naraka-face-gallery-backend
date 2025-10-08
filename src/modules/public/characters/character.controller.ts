import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { CharactersService } from 'src/modules/core/characters/characters.service';
import { plainToInstance } from 'class-transformer';
import { SkipAuth } from 'src/common/decorate/skipAuth';
import { PublicCharacterDto } from './dto/publicCharacter.dto';
import { ParamsSlugDto } from 'src/common/dtos';
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

    @Get('/:slug')
    @SkipAuth()
    async getBySlug(@Param() params: ParamsSlugDto): Promise<PublicCharacterDto> {
        const {slug} = params
        const result = this.charactersService.findBySlug(slug)
        return plainToInstance(PublicCharacterDto, result, { excludeExtraneousValues: true })
    }
}