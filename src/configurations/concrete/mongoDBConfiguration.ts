import { injectable } from "inversify";
import { IClientConfiguraton } from "../interfaces/clientConfiguration";

@injectable()
export class MongoDBConfiguration implements IClientConfiguraton {
    public readonly connectionString: string;
    public readonly database: string;

    constructor(connectionString: string, database: string) {
        this.connectionString = connectionString;
        this.database = database;
    }
}
