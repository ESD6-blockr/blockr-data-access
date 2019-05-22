import { State } from "@blockr/blockr-models";

export const AMOUNT_OF_STATES: number = 5;

export const getState = (publicKey?: string): State => {
    const coin = Math.floor(Math.random() * 1000) + 1;
    const stake = Math.floor(Math.random() * 1000) + 1;
    publicKey = publicKey || "public";
    return new State(publicKey, coin, stake);
};

export const getStates = (): State[] => {
    const states: State[] = [];
    for (let i = 0; i < AMOUNT_OF_STATES; i++) {
        states.push(getState());
    }
    return states;
};
