import { State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import Logger from "../../utils/logger";
import { IStateRepository } from "../interfaces/stateRepository";

/**
 * MongoDB state repository implementation
 */
@injectable()
export class MongoStateRepository implements IStateRepository {
    private client: IClient<Mongo.Db>;
    private readonly states: string;

    constructor(@inject(MongoDB) client: IClient<Mongo.Db>) {
        this.client = client;
        this.states = "states";
    }

    public async getStatesAsync(): Promise<State[]> {
        try {
            Logger.info("Get all states");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.states);

            return await collection.find().toArray();
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async getStateAsync(publicKey: string): Promise<State> {
        try {
            Logger.info("Get single state by publicKey");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.states);

            return new Promise((resolve, reject) => {
                collection.findOne({ publicKey }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(result);
                });
            });
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async setStatesAsync(states: State[]): Promise<void> {
        try {
            Logger.info("Set multiple states");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.states);

            await collection.insertMany(states);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async updateStatesAsync(transactions: Transaction[]): Promise<void> {
        try {
            Logger.info("Update multiple states");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.states);

            await collection.updateMany({ transactions }, transactions);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async clearStatesAsync(): Promise<void> {
        try {
            Logger.info("Clear all states");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.states);

            await collection.deleteMany({});
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }

    public async updateStateAsync(publicKey: string, state: State): Promise<void> {
        try {
            Logger.info("Update single state");

            const database = await this.client.connectAsync();
            const collection = database.collection(this.states);

            await collection.updateOne({publicKey}, state);
        } catch (error) {
            Logger.error(error);

            throw error;
        } finally {
            await this.client.disconnectAsync();
        }
    }
}
