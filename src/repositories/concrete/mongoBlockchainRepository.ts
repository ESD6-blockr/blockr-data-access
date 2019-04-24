import { Block } from "@blockr/blockr-models";
import { IClient, MongoDB } from "app/clients";
import { IClientConfiguraton } from "app/configurations";
import { IBlockchainRepository } from "app/repositories";
import * as Mongo from "mongodb";

/**
 * MongoDB blockchain repository implementation
 */
export class MongoBlockchainRepository implements IBlockchainRepository {
    private client: IClient<Mongo.Db>;
    private readonly tableName: string;

    constructor(configuration: IClientConfiguraton) {
        this.client = new MongoDB(configuration);
        this.tableName = "blocks";
    }

    public async getBlockchainAsync(): Promise<Block[]> {
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

    public async getBlocksByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Block[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "blockHeader.date": { $gt: beginDate, $lt: endDate } }).toArray();
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getBlocksByHashAsync(blockHash: string): Promise<Block[]> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return await collection.find({ "blockHeader.blockHash": blockHash }).toArray();
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return new Promise((resolve, reject) => {
                collection.findOne({ "blockHeader.blockNumber": blockNumber }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(`Block not found ${blockNumber}`);
                });
            });
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async getPreviousBlockAsync(parentHash: string): Promise<Block> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            return new Promise((resolve, reject) => {
                collection.findOne({ "blockHeader.blockHash": parentHash }).then((result) => {
                    if (result) {
                        resolve(result);
                    }

                    reject(`No previous block found for hash ${parentHash}`);
                });
            });
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addBlocksAsync(blocks: Block[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertMany(blocks);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }

    public async addBlockAsync(block: Block): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            await collection.insertOne(block);
        } catch (error) {
            throw error;
        } finally {
            this.client.disconnectAsync();
        }
    }
}
