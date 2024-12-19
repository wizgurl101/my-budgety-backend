import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { FileUtilsService } from '../utils/fileUtils/fileUtils.service';

@Injectable()
export class UploadToExpanseService
{
  private readonly projectId = this.configService.get<string>('PROJECT_ID')
  private readonly projectName = this.configService.get<string>('PROJECT_NAME')

  constructor(private configService: ConfigService,
              private bigQueryService: BigQueryService,
              private fileUtilsService: FileUtilsService) {
  }

  private sortCsvData() {
    //todo implement
  }

  async uploadCsv(file: Express.Multer.File, userId: string) {
    try
    {
      const data = await this.fileUtilsService.getDataFromCsv(file.path);
      return {message: "successfully upload csv data to expanse table",
        data: data, userId: userId};
    }
    catch(error)
    {
      console.log(error)
      return {message: "failed to export csv data to expanse table"};
    }
  }
}
