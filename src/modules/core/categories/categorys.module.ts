import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entitys/category.entity";
import { StorageModule } from "../object-storage/object-storage.module";
import { CategoriesService } from "./category.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        StorageModule,
    ],
    providers: [CategoriesService],
    exports: [CategoriesService]
})

export class CategoriesModule { }