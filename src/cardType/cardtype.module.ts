import { Module } from '@nestjs/common';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';
import { CardTypeService } from './cardtype.service';
import { CardTypeController } from './cardtype.controller';

@Module({
  controllers: [CardTypeController],
  providers: [BigQueryService, UuidService, CardTypeService],
})
export class CardTypeModule {}
