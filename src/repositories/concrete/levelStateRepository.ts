import { State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { IDatabase, LevelDB } from "../../Databases";
import { IStateRepository } from "../interfaces/stateRepository";

/**
 * LevelDB state repository implementation
 */
@injectable()
export class LevelStateRepository implements IStateRepository {
    private database: IDatabase;

    constructor(@inject(LevelDB) database: IDatabase) {
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
