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

    try {
        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();

        const queryResult = [];
        rows.forEach(row => queryResult.push(row));
        return queryResult;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}

export const executeGetAllKeywords = async (userId: string) => {
    const query = `SELECT k.category_id, k.keyword_id, k.name
                            FROM ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.keywords k
                            JOIN ${process.env.PROJECT_ID}.${process.env.PROJECT_NAME}.category c
                            ON k.category_id = c.category_id
                            WHERE k.user_id = ${userId}`;
    const options = {
        query: query,
    };

    try {
        const [job] = await bigquery.createQueryJob(options);
        const [rows] = await job.getQueryResults();

        const queryResult = [];
        rows.forEach(row => queryResult.push(row));
        return queryResult;
    }
    catch (err) {
        console.error(err);
        return [];
    }
}