import { injectable } from "inversify";
import * as Mongo from "mongodb";
import Logger from "../../logger/logger";
import { IClient } from "../interfaces/client";

@injectable()
export class MongoDB implements IClient<Mongo.Db> {
    private client: Mongo.MongoClient;

    public async connectAsync(): Promise<Mongo.Db> {
        Logger.info("Opening MongoDB connection");

        this.client = await Mongo.connect("mongodb://localhost:27017");
        return await this.client.db("db_name");
    }

    public async disconnectAsync(): Promise<void> {
        Logger.info("Closing MongoDB connection");
        
        await this.client.close();
    }
}
