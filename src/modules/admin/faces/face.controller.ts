import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseInterceptors,
    UploadedFiles,
    ParseFilePipeBuilder,
    HttpStatus,
    Query,
    Request,
    Req,
    Ip,
} from '@nestjs/common';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';
import { FaceService } from 'src/modules/core/faces/face.service';
import { CreateFaceDto, UpdateFaceDto, GroupFile } from 'src/modules/core/faces/dtos';
import { PageDto } from 'src/common/dtos';
import { FacePageOptionsDto } from 'src/modules/core/faces/dtos';
import { AdminFaceDto2 } from './dtos/adminFace.dto';
import { plainToInstance } from 'class-transformer';
import { CustomAdminInRequest } from '../dtos/customAdminInRequest.dto';
import { ContextLogDto } from 'src/modules/core/activityLogs/dtos/context.dto';

@Controller('admin/face')
export class AdminFaceController {
    constructor(
        private readonly faceService: FaceService,
    ) { }

    @Get()
    async findAll(@Query() query: FacePageOptionsDto): Promise<PageDto<AdminFaceDto2>> {
        const result = await this.faceService.findAll(query);
        return new PageDto(
            plainToInstance(AdminFaceDto2, result.data, { excludeExtraneousValues: true }),
            result.meta,
        );
    }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'qrCodeCN', maxCount: 1 },
            { name: 'qrCodeGlobals', maxCount: 1 },
            { name: 'imageReviews', maxCount: 5 },
        ]),
    )
    async create(
        @Body() data: CreateFaceDto,
        @UploadedFiles()
        files: {
            qrCodeCN?: Express.Multer.File[],
            qrCodeGlobals?: Express.Multer.File[],
            imageReviews?: Express.Multer.File[],
        },
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
    )
    // : Promise<DataFaceDto> 
    {
        const qrCodeCN = files.qrCodeCN?.[0];
        const qrCodeGlobals = files.qrCodeGlobals?.[0];
        const imageReviews = files.imageReviews ?? [];
        const admin = request.user;
        const contextLog: ContextLogDto = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        // Tạo pipe để validate từng file
        const pipe = new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: 'image' })
            .addMaxSizeValidator({ maxSize: 10 * 1024 * 1024 }) // 10MB
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            });

        await Promise.all([
            qrCodeCN ? pipe.transform(qrCodeCN) : null,
            qrCodeGlobals ? pipe.transform(qrCodeGlobals) : null,
            ...imageReviews.map(file => pipe.transform(file)),
        ]);

        return this.faceService.create(data, contextLog, imageReviews, qrCodeGlobals, qrCodeCN);
    }

    @Put(':id')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'qrCodeCN', maxCount: 1 },
            { name: 'qrCodeGlobals', maxCount: 1 },
            { name: 'imageReviews', maxCount: 5 },
        ]),
    )
    async update(
        @Param() params: ParamsIdDto,
        @Body() data: UpdateFaceDto,
        @UploadedFiles() files: {
            qrCodeCN?: Express.Multer.File[],
            qrCodeGlobals?: Express.Multer.File[],
            imageReviews?: Express.Multer.File[],
        },
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,
    ) {
        const qrCodeCN = files.qrCodeCN?.[0];
        const qrCodeGlobals = files.qrCodeGlobals?.[0];
        const imageReviews = files.imageReviews ?? [];
        const admin = request.user;
        const contextLog: ContextLogDto = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }

        // Tạo pipe để validate từng file
        const pipe = new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: 'image' })
            .addMaxSizeValidator({ maxSize: 10 * 1024 * 1024 }) // 10MB
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            });

        // Validate từng file
        if (qrCodeCN) await pipe.transform(qrCodeCN);
        if (qrCodeGlobals) await pipe.transform(qrCodeGlobals);
        for (const file of imageReviews) {
            await pipe.transform(file);
        }

        const fileData: GroupFile = {
            fileImageReviews: imageReviews,
            fileQrCodeCN: qrCodeCN,
            fileQrCodeGlobals: qrCodeGlobals
        }
        return this.faceService.update(params.id, data, fileData, contextLog);
    }


    @Delete(':id')
    async delete(@Param() params: ParamsIdDto,
        @Request() request: CustomAdminInRequest,
        @Req() req: Request,
        @Ip() ip: string,)
    {
        const { id } = params
        const admin = request.user;
        const contextLog: ContextLogDto = {
            adminId: admin.id,
            ipAddress: ip,
            userAgent: req.headers['user-agent'],
        }
        return await this.faceService.remove(id, contextLog)
    }

}
