import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClientConfiguraton, MongoDBConfiguration } from "../../configurations";
import Logger from "../../utils/logger";
import { IClient } from "../interfaces/client";

@injectable()
export class MongoDB implements IClient<Mongo.Db> {
    private client: Mongo.MongoClient;
    private readonly configuration: IClientConfiguraton;

    constructor(@inject(MongoDBConfiguration) configuration: IClientConfiguraton) {
        this.configuration = configuration;
    }

    public async connectAsync(): Promise<Mongo.Db> {
        Logger.info("Opening MongoDB connection");

        this.client = await Mongo.connect(this.configuration.connectionString);
        return await this.client.db(this.configuration.database);
    }

    public async disconnectAsync(): Promise<void> {
        Logger.info("Closing MongoDB connection");
        
        await this.client.close();
    }
}
