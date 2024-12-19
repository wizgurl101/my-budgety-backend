import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { FileUtilsService } from '../utils/fileUtils/fileUtils.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class UploadToExpanseService
{
  private readonly projectId = this.configService.get<string>('PROJECT_ID')
  private readonly projectName = this.configService.get<string>('PROJECT_NAME')

  constructor(private configService: ConfigService,
              private bigQueryService: BigQueryService,
              private fileUtilsService: FileUtilsService,
              private categoryService: CategoryService) {
  }

  private sortCsvData(unsortedData: any) {
    //todo implement
  }

  async uploadCsv(file: Express.Multer.File, userId: string) {
    try
    {
      // const data = await this.fileUtilsService.getDataFromCsv(file.path);
      await this.categoryService.getAllCategoryWithKeywords(userId);
      return {message: "successfully upload csv data to expanse table"};
    }
    catch(error)
    {
      console.log(error)
      return {message: "failed to export csv data to expanse table"};
    }
  }
}
