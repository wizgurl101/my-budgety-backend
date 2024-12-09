import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryService {
  private readonly bigQuery: BigQuery = new BigQuery({
          keyFilename: this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS'),
          projectId: this.configService.get<string>('GOOGLE_PROJECT_ID'),
});

  constructor(private configService: ConfigService) {
    this.bigQuery = new BigQuery();
  }

  async query(query: string) {
    const options = {
      query: query,
    };

    const [job] = await this.bigQuery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    const queryResult = []

      rows.forEach(row => queryResult.push(row))

    return queryResult;
  }
}