import { Transaction, TransactionHeader, TransactionType } from "@blockr/blockr-models";

export const AMOUNT_OF_TRANSACTIONS: number = 5;

export const getTransaction = (): Transaction => {
    const amount = Math.floor(Math.random() * 1000) + 1;
    const transactionHeader: TransactionHeader =
        new TransactionHeader("recipient", "sender", amount, new Date(), undefined, undefined);
    return new Transaction(TransactionType.COIN, transactionHeader, "signature");
};

export const getTransactions = (): Transaction[] => {
    const transactions: Transaction[] = [];
    for (let i = 0; i < AMOUNT_OF_TRANSACTIONS; i++) {
        transactions.push(getTransaction());
    }
    return transactions;
};
