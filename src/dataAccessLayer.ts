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

    public async getBlocksByPeriodAsync(beginTimestamp: number, endTimestamp: number): Promise<Block[]> {
        return await this.blockchainRepository.getBlocksByPeriodAsync(beginTimestamp, endTimestamp);
    }

    public async getBlocksByDateAsync(timestamp: number): Promise<Block[]> {
        return await this.blockchainRepository.getBlocksByDateAsync(timestamp);
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

    public async getNextBlockAsync(blockHash: string): Promise<Block> {
        return await this.blockchainRepository.getNextBlockAsync(blockHash);
    }

    public async createBlocksAsync(blocks: Block[]): Promise<void> {
        await this.blockchainRepository.createBlocksAsync(blocks);
    }

    public async createBlockAsync(block: Block): Promise<void> {
        await this.blockchainRepository.createBlockAsync(block);
    }

    public async deleteBlocksAsync(blockNumbers: number[]): Promise<void> {
        await this.blockchainRepository.deleteBlocksAsync(blockNumbers);
    }

    public async deleteBlockAsync(blockNumber: number): Promise<void> {
        await this.blockchainRepository.deleteBlockAsync(blockNumber);
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

    public async getTransactionsByDateAsync(timestamp: number): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByDateAsync(timestamp);
    }

    public async getTransactionsByPeriodAsync(beginTimestamp: number, endTimestamp: number): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByPeriodAsync(beginTimestamp, endTimestamp);
    }

    public async getTransactionsByRecipientAsync(recipient: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByRecipientAsync(recipient);
    }

    public async getTransactionsBySenderAsync(sender: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsBySenderAsync(sender);
    }

    public async getTransactionsBySignatureAsync(signature: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsBySignatureAsync(signature);
    }

    public async getTransactionsByRouteAsync(sender: string, recipient: string): Promise<Transaction[]> {
        return await this.transactionRepository.getTransactionsByRouteAsync(sender, recipient);
    }

    public async createTransactionsAsync(transactions: Transaction[]): Promise<void> {
        await this.transactionRepository.createTransactionsAsync(transactions);
    }

    public async createTransactionAsync(transaction: Transaction): Promise<void> {
        await this.transactionRepository.createTransactionAsync(transaction);
    }
}
