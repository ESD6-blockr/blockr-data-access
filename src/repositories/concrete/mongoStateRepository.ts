import { State, Transaction } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { IStateRepository } from "../../repositories";

/**
 * MongoDB state repository implementation
 */
export class MongoStateRepository implements IStateRepository {
    private readonly client: IClient<Mongo.Db>;
    private readonly tableName: string;

    constructor(configuration: IClientConfiguration) {
        this.client = new MongoDB(configuration);
        this.tableName = "states";
    }

    public async getStatesAsync(): Promise<State[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find().toArray();
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getStateAsync(publicKey: string): Promise<State> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return new Promise((resolve, reject) => {
                collection.findOne({ publicKey }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(result);
                });
            });
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async setStatesAsync(states: State[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(states);
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async updateStatesAsync(transactions: Transaction[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.updateMany({ transactions }, { $set: transactions }, { upsert: true });
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async clearStatesAsync(): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.deleteMany({});
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async updateStateAsync(publicKey: string, state: State): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.updateOne({publicKey}, { $set: state}, { upsert: true });
        } finally {
            await this.client.disconnectAsync();
        }
    }
}
