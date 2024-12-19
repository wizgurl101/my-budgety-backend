import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';
import { createReadStream } from "fs";
import * as csv from 'csv-parser';

@Injectable()
export class UploadToExpanseService
{
  private readonly projectId = this.configService.get<string>('PROJECT_ID')
  private readonly projectName = this.configService.get<string>('PROJECT_NAME')

  constructor(private configService: ConfigService,
              private bigQueryService: BigQueryService) {
  }

  private sortCsvData() {
    //todo implement
  }

  async uploadCsv(file: Express.Multer.File, userId: string) {
    // const csv_data = []
    // const stream = fs.createReadStream(file.path).pipe(csv());
    //
    // for await (const data of stream) {
    //   results.push(data);
    // }
    //
    // console.log(JSON.stringify(csv_data));
    //todo sort the data to category

    return { message: 'File uploaded and processed successfully!',
             filename: file.filename };
  }
}