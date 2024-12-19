import { Module } from '@nestjs/common';
import { UploadToExpanseService } from './uploadToExpanse.service';
import { UploadToExpanseController } from './uploadToExpanse.controller';
import { BigQueryService } from "../db/bigQuery/bigquery.service";
import { UuidService} from "../utils/uuid/uuid.service";
import { FileUtilsService } from '../utils/fileUtils/fileUtils.service';

@Module({
  controllers: [UploadToExpanseController],
  providers: [UploadToExpanseService, BigQueryService, UuidService, FileUtilsService],
})

export class UploadToExpanseModule {}