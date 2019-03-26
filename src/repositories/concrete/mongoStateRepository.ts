import { State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import * as Mongo from "mongodb";
import { IClient, MongoDB } from "../../clients";
import { IStateRepository } from "../interfaces/stateRepository";

/**
 * MongoDB state repository implementation
 */
@injectable()
export class MongoStateRepository implements IStateRepository {
    private client: IClient<Mongo.Db>;

    constructor(@inject(MongoDB) client: IClient<Mongo.Db>) {
        this.client = client;
    }

    public async getStatesAsync(): Promise<State[]> {
        throw new Error("Method not implemented.");
    }
    
    public async getStateAsync(publicKey: string): Promise<State> {
        throw new Error("Method not implemented.");
    }

    public async setStatesAsync(states: State[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async updateStatesAsync(transactions: Transaction[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async clearStatesAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
