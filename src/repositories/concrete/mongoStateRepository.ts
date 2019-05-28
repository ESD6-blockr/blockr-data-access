import { State } from "@blockr/blockr-models";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IClientConfiguration } from "../../configurations";
import { EntityNotFoundException } from "../../exceptions/entityNotFound.exception";
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

    public async getStateAsync(publicKey: string): Promise<State | undefined> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);

            const state = await collection.findOne<State>({ publicKey });

            if (!state) {
                return undefined;
            }

            return Object.assign(new State("", 0, 0), state);
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

    public async updateStatesAsync(states: State[]): Promise<void> {
        try {
            const database = await this.client.connectAsync();
            const collection = database.collection(this.tableName);
   
            for (const state of states) {
                await collection.updateOne({ publicKey: state.publicKey }, { $set: state }, { upsert: true });
            }
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
