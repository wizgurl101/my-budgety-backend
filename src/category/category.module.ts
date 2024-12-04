import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { BigQueryService } from "../db/bigQuery/bigquery.service";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, BigQueryService],
})

export class CategoryModule {}