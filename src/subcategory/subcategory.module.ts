import { Module } from '@nestjs/common';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';
import { SubCategoryService } from './subcategory.service';
import { SubCategoryController } from './subcategory.controller';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService, BigQueryService, UuidService],
})
export class SubCategoryModule {}
