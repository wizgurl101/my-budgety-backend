import { Module } from '@nestjs/common';
import { MonthlyBudgetController } from './monthlyBudget.controller';
import { MonthlyBudgetService } from './monthlyBudget.service';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';

@Module({
  controllers: [MonthlyBudgetController],
  providers: [MonthlyBudgetService, BigQueryService, UuidService],
})
export class MonthlyBudgetModule {}