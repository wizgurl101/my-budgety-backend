import { Database } from '../repository/bigquery.repository'

export default class DatabaseService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    async query(query: string): Promise<any> {
        return this.database.query(query);
    }
}