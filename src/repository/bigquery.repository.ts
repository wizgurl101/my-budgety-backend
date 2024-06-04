import { BigQuery } from '@google-cloud/bigquery';

const bigqueryRepository = new BigQuery({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export interface Database {
    query(query: string): any;
}

export class BigQueryDatabase implements Database {
    query(query: string): any {
        const options = {
            query: query,
        };

        const [job] = await bigqueryRepository.createQueryJob(options);
        const [rows] = await job.getQueryResults();
        const queryResult = [];

        rows.forEach(row => queryResult.push(row));
        return queryResult;
    }
}