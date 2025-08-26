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
import { FileInterceptor, FileFieldsInterceptor } from "@nestjs/platform-express";
import { ParamsIdDto } from 'src/common/dtos/ParamsId.dto';
import { FaceService } from 'src/modules/core/faces/face.service';
import { CreateFaceDto, DataFaceDto, UpdateFaceDto, GroupFile } from 'src/modules/core/faces/dtos';
import { PageOptionsDto, PageDto } from 'src/common/dtos';
import { FacePageOptionsDto } from 'src/modules/core/faces/dtos';
import { AdminFaceDto } from './dtos/admin-face.dto';

@Controller('admin/face')
export class AdminFaceController {
    constructor(
        private readonly faceService: FaceService,
    ) { }

    @Get()
    async findAll(@Query() query: FacePageOptionsDto) {
        const result = await this.faceService.findAll(query);

        return new PageDto(
            result.data.map(face => new AdminFaceDto(face)),
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
    )
    // : Promise<DataFaceDto> 
    {
        const qrCodeCN = files.qrCodeCN?.[0];
        const qrCodeGlobals = files.qrCodeGlobals?.[0];
        const imageReviews = files.imageReviews ?? [];

        // Tạo pipe để validate từng file
        const pipe = new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: 'image' })
            .addMaxSizeValidator({ maxSize: 10_000_000 }) // 10MB
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            });

        await Promise.all([
            qrCodeCN ? pipe.transform(qrCodeCN) : null,
            qrCodeGlobals ? pipe.transform(qrCodeGlobals) : null,
            ...imageReviews.map(file => pipe.transform(file)),
        ]);


        // Gọi service xử lý
        return this.faceService.create(data, imageReviews, qrCodeGlobals, qrCodeCN);
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
    ) {
        const qrCodeCN = files.qrCodeCN?.[0];
        const qrCodeGlobals = files.qrCodeGlobals?.[0];
        const imageReviews = files.imageReviews ?? [];

        // Tạo pipe để validate từng file
        const pipe = new ParseFilePipeBuilder()
            .addFileTypeValidator({ fileType: 'image' })
            .addMaxSizeValidator({ maxSize: 10_000_000 }) // 10MB
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
        return this.faceService.update(params.id, data, fileData);
    }


    @Delete(':id')
    async delete(@Param() params: ParamsIdDto,)
    // : Promise<DataFaceDto>
    {
        const { id } = params
        return await this.faceService.remove(id)
    }

}
