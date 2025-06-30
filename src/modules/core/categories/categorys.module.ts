import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entitys/category.entity";
import { StorageModule } from "../object-storage/object-storage.module";
import { CategoryService } from "./category.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        StorageModule,
    ],
    providers: [CategoryService],
    exports: [CategoryService]
})

export class CategoriesModule { }