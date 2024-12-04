import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { BigQueryService } from "../db/bigQuery/bigquery.service";
import { UuidService} from "../utils/uuid/uuid.service";

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, BigQueryService, UuidService],
})

export class CategoryModule {}