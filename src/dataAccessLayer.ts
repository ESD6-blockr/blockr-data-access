import "reflect-metadata";

import { Block, State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { DataSource } from "./clients";
import DIContainer from "./injection/container";
import { LevelBlockchainRepository, LevelStateRepository, LevelTransactionRepository } from "./repositories";
import { MongoBlockchainRepository, MongoStateRepository, MongoTransactionRepository } from "./repositories";
import { IBlockchainRepository, IStateRepository, ITransactionRepository } from "./repositories";

@injectable()
export class DataAccessLayer {
    private blockchainRepository: IBlockchainRepository;
    private stateRepository: IStateRepository;
    private transactionRepository: ITransactionRepository;

    constructor(@inject("DataSource") dataSource: DataSource) {
        switch (dataSource) {
            case DataSource.LEVEL_DB:
                this.blockchainRepository = DIContainer.resolve<IBlockchainRepository>(LevelBlockchainRepository);
                this.stateRepository = DIContainer.resolve<IStateRepository>(LevelStateRepository);
                this.transactionRepository = DIContainer.resolve<ITransactionRepository>(LevelTransactionRepository);
                break;
            case DataSource.MONGO_DB:
                this.blockchainRepository = DIContainer.resolve<IBlockchainRepository>(MongoBlockchainRepository);
                this.stateRepository = DIContainer.resolve<IStateRepository>(MongoStateRepository);
                this.transactionRepository = DIContainer.resolve<ITransactionRepository>(MongoTransactionRepository);
                break;
            default:
                throw new Error("Unrecognised dataSource");
        }
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        return await this.blockchainRepository.getBlockchainAsync();
    }

    public async getBlocksByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Block[]> {
        return await this.blockchainRepository.getBlocksByDatePeriodAsync(beginDate, endDate);
    }

    public async getBlocksByHashAsync(blockHash: string): Promise<Block[]> {
        return await this.blockchainRepository.getBlocksByHashAsync(blockHash);
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        return await this.blockchainRepository.getBlockAsync(blockNumber);
    }

    public async getPreviousBlockAsync(parentHash: string): Promise<Block> {
        return await this.blockchainRepository.getPreviousBlockAsync(parentHash);
    }

    public async createBlocksAsync(blocks: Block[]): Promise<void> {
        await this.blockchainRepository.createBlocksAsync(blocks);
    }

    public async createBlockAsync(block: Block): Promise<void> {
        await this.blockchainRepository.createBlockAsync(block);
    }

    public async getStatesAsync(): Promise<State[]> {
        return await this.stateRepository.getStatesAsync();
    }

    public async getStateAsync(publicKey: string): Promise<State> {
        return await this.stateRepository.getStateAsync(publicKey);
    }

    public async setStatesAsync(states: State[]): Promise<void> {
        await this.stateRepository.setStatesAsync(states);
    }

    public async updateStatesAsync(transactions: Transaction[]): Promise<void> {
        await this.stateRepository.updateStatesAsync(transactions);
    }

    public async updateStateAsync(publicKey: string, state: State) {
        await this.stateRepository.updateStateAsync(publicKey, state);
    }

    public async clearStatesAsync(): Promise<void> {
        await this.stateRepository.clearStatesAsync();
    }

    public async getTransactionsAsync(): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsAsync();
    }

    public async getTransactionsByAmountAsync(amount: number): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByAmountAsync(amount);
    }

    public async getTransactionsByDatePeriodAsync(beginDate: Date, endDate: Date): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByDatePeriodAsync(beginDate, endDate);
    }

    public async getTransactionsByRecipientKeyAsync(recipientKey: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByRecipientKeyAsync(recipientKey);
    }

    public async getTransactionsBySenderKeyAsync(senderKey: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsBySenderKeyAsync(senderKey);
    }

    public async getTransactionsBySenderKeyToRecipientKeyAsync(senderKey: string, recipientKey: string):
        Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsBySenderKeyToRecipientKeyAsync(senderKey, recipientKey);
    }

    public async createTransactionsAsync(transactions: Transaction[]): Promise<void> {
        await this.transactionRepository.createTransactionsAsync(transactions);
    }

    public async createTransactionAsync(transaction: Transaction): Promise<void> {
        await this.transactionRepository.createTransactionAsync(transaction);
    }
}
