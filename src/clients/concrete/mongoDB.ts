import { IClient } from "app/clients";
import { IClientConfiguration } from "app/configurations";
import * as Mongo from "mongodb";

export class MongoDB implements IClient<Mongo.Db> {
    private client: Mongo.MongoClient;
    private readonly configuration: IClientConfiguration;

    constructor(configuration: IClientConfiguration) {
        this.configuration = configuration;
    }

    public async connectAsync(): Promise<Mongo.Db> {
        this.client = await Mongo.connect(this.configuration.connectionString);
        return this.client.db(this.configuration.database);
    }

    public async disconnectAsync(): Promise<void> {
        await this.client.close();
    }
}
