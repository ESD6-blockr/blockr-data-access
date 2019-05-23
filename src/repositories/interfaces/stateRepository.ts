import { State, Transaction } from "@blockr/blockr-models";

export interface IStateRepository {
    /**
     * Get all states
     * @returns {Promise<State[]>} array of states
     */
    getStatesAsync(): Promise<State[]>;
    /**
     * Get single state by publicKey
     * @param publicKey publicKey
     * @returns {Promise<State>} state
     */
    getStateAsync(publicKey: string): Promise<State>;
    /**
     * Set multiple states
     * @param states array of states 
     */
    setStatesAsync(states: State[]): Promise<void>;
    /**
     * Update multiple state transactions
     * @param transactions array of transactions
     */
    updateStatesAsync(states: State[]): Promise<void>;
    /**
     * Update single state by publicKey
     * @param publicKey publicKey
     * @param state single state
     */
    updateStateAsync(publicKey: string, state: State): Promise<void>;
    /**
     * Clear all states
     */
    clearStatesAsync(): Promise<void>;
}
