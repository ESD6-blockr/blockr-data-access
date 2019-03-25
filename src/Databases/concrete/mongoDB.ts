import { injectable } from "inversify";
import { MongoClient } from "mongodb/";
import { IDatabase } from "../interfaces/database";

@injectable()
export class MongoDB implements IDatabase {
    private mongoClient: MongoClient;

    public async connectAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    public async disconnectAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
