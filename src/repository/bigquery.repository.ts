import { BigQuery } from '@google-cloud/bigquery';

const bigqueryRepository = new BigQuery({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

type optionsType = {
    query: string;
};

//todo define the type of the query result from bigquery

export interface Database {
    query(query: string): Promise<any>;
}

export class BigQueryDatabase implements Database {
    async query(query: string): Promise<any> {
        const options: optionsType = {
            query: query,
        };

        try {
            const [job] = await bigqueryRepository.createQueryJob(options);
            const [rows] = await job.getQueryResults();
            const queryResult = [];

            rows.forEach(row => queryResult.push(row));
            return queryResult;
        } catch(err) {
            // todo add logger
            console.error(err);
            return []
        }
    }
}