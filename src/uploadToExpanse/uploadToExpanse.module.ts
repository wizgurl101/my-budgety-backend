import { Module } from '@nestjs/common';
import { UploadToExpanseService } from './uploadToExpanse.service';
import { UploadToExpanseController } from './uploadToExpanse.controller';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { UuidService } from '../utils/uuid/uuid.service';
import { FileUtilsService } from '../utils/fileUtils/fileUtils.service';
import { CategoryService } from '../category/category.service';
import { KeywordService } from '../keyword/keyword.service';
import { DateUtilsService } from '../utils/dateUtils/dateUtils.service';

@Module({
  controllers: [UploadToExpanseController],
  providers: [
    UploadToExpanseService,
    BigQueryService,
    UuidService,
    FileUtilsService,
    CategoryService,
    KeywordService,
    DateUtilsService
  ],
})
export class UploadToExpanseModule {}
