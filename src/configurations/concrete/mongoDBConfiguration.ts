import { injectable } from "inversify";
import { IClientConfiguration } from "../../configurations";

@injectable()
export class MongoDBConfiguration implements IClientConfiguration {
    public readonly connectionString: string;
    public readonly database: string;

    constructor(connectionString: string, database: string) {
        this.connectionString = connectionString;
        this.database = database;
    }
}
