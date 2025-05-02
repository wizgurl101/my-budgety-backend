import { Module } from '@nestjs/common';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';
import { GamesSpentAmountService } from './gamesSpentAmount.service';
import { GamesSpentAmountController } from './gamesSpentAmount.controller';

@Module({
  controllers: [GamesSpentAmountController],
  providers: [BigQueryService, UuidService, GamesSpentAmountService],
})
export class GamesSpentAmountModule {}
