import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';
import { KeywordService } from '../keyword/keyword.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, BigQueryService, UuidService, KeywordService],
})
export class CategoryModule {}
