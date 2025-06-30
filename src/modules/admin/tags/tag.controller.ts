import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';
import { TagService } from 'src/modules/core/tags/tag.service';
import { CreateTagDto, UpdateTagDto, DataTagDto } from 'src/modules/core/tags/dtos';

@Controller('admin/tag')
export class AdminTagController {
    constructor(
        private readonly tagService: TagService,
    ) { }

    @Get()
    async getList(): Promise<any> {
        return await this.tagService.findAll()
    }

    @Post()
    async create(@Body() data: CreateTagDto): Promise<DataTagDto> {
        return await this.tagService.create(data)
    }

    @Patch(':id')
    async update(@Param() params: ParamsIdDto, @Body() data: UpdateTagDto,): Promise<DataTagDto> {
        const { id } = params
        return await this.tagService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param() params: ParamsIdDto) {
        const { id } = params
        return await this.tagService.remove(id)
    }

}
