import { IClientConfiguration } from "app/configurations";
import { injectable } from "inversify";

@injectable()
export class MongoDBConfiguration implements IClientConfiguration {
    public readonly connectionString: string;
    public readonly database: string;

    constructor(connectionString: string, database: string) {
        this.connectionString = connectionString;
        this.database = database;
    }
}
