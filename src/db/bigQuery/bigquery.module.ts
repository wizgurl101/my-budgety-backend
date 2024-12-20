import { Module } from '@nestjs/common';
import { BigQueryService } from './bigquery.service';

@Module({
  providers: [BigQueryService],
})
export class BigqueryModule {}
