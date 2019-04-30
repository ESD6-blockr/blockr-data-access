import { State, Transaction } from "@blockr/blockr-models";
import { IClient, MongoDB } from "app/clients";
import { IClientConfiguration } from "app/configurations";
import { IStateRepository } from "app/repositories";
import * as Mongo from "mongodb";

/**
 * MongoDB state repository implementation
 */
export class MongoStateRepository implements IStateRepository {
    private client: IClient<Mongo.Db>;
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
        } catch (error) {
            throw error;
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
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async setStatesAsync(states: State[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(states);
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async updateStatesAsync(transactions: Transaction[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.updateMany({ transactions }, transactions);
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async clearStatesAsync(): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.deleteMany({});
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async updateStateAsync(publicKey: string, state: State): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.updateOne({publicKey}, state);
        } catch (error) {
            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }
}
