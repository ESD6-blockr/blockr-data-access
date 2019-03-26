import { State, Transaction } from "@blockr/blockr-models";

export interface IStateRepository {
    getStatesAsync(): Promise<State[]>;
    getStateAsync(publicKey: string): Promise<State>;
    setStatesAsync(states: State[]): Promise<void>;
    updateStatesAsync(transactions: Transaction[]): Promise<void>;
    clearStatesAsync(): Promise<void>;
}
