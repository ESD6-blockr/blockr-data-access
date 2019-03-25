import { State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { IDatabase, MongoDB } from "../../Databases";
import { IStateRepository } from "../interfaces/stateRepository";

/**
 * MongoDB state repository implementation
 */
@injectable()
export class MongoStateRepository implements IStateRepository {
    private database: IDatabase;

    constructor(@inject(MongoDB) database: IDatabase) {
        this.database = database;
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

    public async updateStateAsync(transactions: Transaction[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async clearStateAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
