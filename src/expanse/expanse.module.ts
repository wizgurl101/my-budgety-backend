import { Module } from '@nestjs/common';
import { ExpanseController } from './expanse.controller';
import { ExpanseService } from './expanse.service';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [ExpanseController],
  providers: [ExpanseService, BigQueryService, UuidService],
})
export class ExpanseModule {}
