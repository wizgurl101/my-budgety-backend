import { Injectable } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class BigQueryService {
  private readonly bigQuery: BigQuery;

  constructor() {
    this.bigQuery = new BigQuery({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      projectId: process.env.PROJECT_ID,
    });
  }

  async query(query: string, params?: any) {
    const options = {
      query: query,
      params: params,
      location: process.env.BIG_QUERY_LOCATION,
    };

    const [job] = await this.bigQuery.createQueryJob(options);
    const [rows] = await job.getQueryResults();
    const queryResult = [];

    rows.forEach((row) => queryResult.push(row));

    return queryResult;
  }
}
