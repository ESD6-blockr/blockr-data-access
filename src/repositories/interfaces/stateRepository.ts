import { State, Transaction } from "@blockr/blockr-models";

export interface IStateRepository {
    getStatesAsync(): Promise<State[]>;
    getStateAsync(publicKey: string): Promise<State>;
    setStatesAsync(states: State[]): Promise<void>;
    updateStateAsync(transactions: Transaction[]): Promise<void>;
    clearStateAsync(): Promise<void>;
}
