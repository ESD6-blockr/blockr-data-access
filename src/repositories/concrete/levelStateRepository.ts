import { State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { IClient, LevelDB } from "../../clients";
import { IStateRepository } from "../interfaces/stateRepository";

/**
 * LevelDB state repository implementation
 */
@injectable()
export class LevelStateRepository implements IStateRepository {
    private client: IClient<void>;

    constructor(@inject(LevelDB) client: IClient<void>) {
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
