import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export const executeUserQuery = async () => {
    const query = `SELECT * FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.users LIMIT 1000`;
    const options = {
        query: query,
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    rows.forEach(row => console.log(row));
}

export const executeGetCurrentExpanse = async (userId: string) => {
    const query = `SELECT * FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.expanse 
                            WHERE user_id = ${userId} AND MONTH(date) = MONTH(CURRENT_DATE()) LIMIT 1000`;
    const options = {
        query: query,
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    rows.forEach(row => console.log(row));
}