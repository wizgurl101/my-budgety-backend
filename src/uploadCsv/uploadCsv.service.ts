import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQueryService } from '../db/bigQuery/bigquery.service';

@Injectable()
export class UploadCsvService
{
  private readonly projectId = this.configService.get<string>('PROJECT_ID')
  private readonly projectName = this.configService.get<string>('PROJECT_NAME')

  constructor(private configService: ConfigService,
              private bigQueryService: BigQueryService) {
  }

  private sortCsvData() {
    //todo implement
  }

  async upload(userId: string) {
    //todo implement
  }
}