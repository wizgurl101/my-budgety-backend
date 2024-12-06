import { Module } from '@nestjs/common';
import { UploadCsvService } from './uploadCsv.service';
import { BigQueryService } from "../db/bigQuery/bigquery.service";
import { UuidService} from "../utils/uuid/uuid.service";

@Module({
  controllers: [UploadCsvService],
  providers: [UploadCsvService, BigQueryService, UuidService],
})

export class UploadCsvModule {}