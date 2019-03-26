import { injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient } from "../interfaces/client";

@injectable()
export class MongoDB implements IClient<Mongo.Db> {
    private client: Mongo.MongoClient;

    public async connectAsync(): Promise<Mongo.Db> {
        this.client = await Mongo.connect("mongodb://localhost:27017");
        return await this.client.db("db_name");
    }

    public async disconnectAsync(): Promise<void> {
        await this.client.close();
    }
}
