import { Module } from '@nestjs/common';
import { CategoryItemController } from './categoryItem.controller';
import { CategoryItemService } from './categoryItem.service';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';

@Module({
  controllers: [CategoryItemController],
  providers: [CategoryItemService, BigQueryService, UuidService],
})
export class CategoryItemModule {}
