import { Module } from "@nestjs/common";
import { ExpanseService } from './expanse.service';
import { BigQueryService } from "../db/bigQuery/bigquery.service";
import { UuidService} from "../utils/uuid/uuid.service";

@Module({
  controllers: [],
  providers: [ExpanseService, BigQueryService, UuidService],
})

export class ExpanseModule {}