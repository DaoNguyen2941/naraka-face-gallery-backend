import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    Put,
    Request,
    Req,
    Ip,
} from '@nestjs/common';
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';
import { TagService } from 'src/modules/core/tags/tag.service';
import { CreateTagDto, UpdateTagDto, DataTagDto } from 'src/modules/core/tags/dtos';
import { CustomAdminInRequest } from '../dtos/customAdminInRequest.dto';
import { ContextLogDto } from 'src/modules/core/activityLogs/dtos/context.dto';
@Controller('admin/tag')
export class AdminTagController {
    constructor(
        private readonly tagService: TagService,
    ) { }

    @Get()
    async getList(): Promise<DataTagDto[]> {
        return await this.tagService.findAll()
    }

    @Post()
    async create(@Body() data: CreateTagDto,
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
    ): Promise<DataTagDto> {
        const admin = request.user;
        const contextLog: ContextLogDto = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        return await this.tagService.create(data, contextLog)
    }

    @Put(':id')
    async update(
        @Param() params: ParamsIdDto,
        @Body() data: UpdateTagDto,
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
    ): Promise<DataTagDto> {
        const { id } = params
        const admin = request.user;
        const contextLog: ContextLogDto = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        return await this.tagService.update(id, data, contextLog)
    }

    @Delete(':id')
    async delete(
        @Param() params: ParamsIdDto,
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,) {
        const { id } = params
        const admin = request.user;
        const contextLog: ContextLogDto = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        return await this.tagService.remove(id,contextLog)
    }

}
