import "reflect-metadata";

import { Block, State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { DataSource, IClientConfiguration } from ".";
import { IBlockchainRepository, IStateRepository, ITransactionRepository } from "./repositories";
import { MongoBlockchainRepository, MongoStateRepository, MongoTransactionRepository } from "./repositories";

@injectable()
export class DataAccessLayer {
    private readonly blockchainRepository: IBlockchainRepository;
    private readonly stateRepository: IStateRepository;
    private readonly transactionRepository: ITransactionRepository;

    constructor(@inject("DataSource") dataSource: DataSource,
                @inject("Configuration") configuration: IClientConfiguration) {
        switch (dataSource) {
            case DataSource.LEVEL_DB:
                throw new Error("Not yet implemented");
            case DataSource.MONGO_DB:
                this.blockchainRepository = new MongoBlockchainRepository(configuration);
                this.stateRepository = new MongoStateRepository(configuration);
                this.transactionRepository = new MongoTransactionRepository(configuration);
                break;
            default:
                throw new Error("Unrecognised dataSource");
        }
    }

    public async getBlocksByQueryAsync(queries?: object): Promise<Block[]> {
        return this.blockchainRepository.getBlocksByQueryAsync(queries);
    }

    public async addBlocksAsync(blocks: Block[]): Promise<void> {
        await this.blockchainRepository.addBlocksAsync(blocks);
    }

    public async addBlockAsync(block: Block): Promise<void> {
        await this.blockchainRepository.addBlockAsync(block);
    }

    public async getStatesAsync(): Promise<State[]> {
        return this.stateRepository.getStatesAsync();
    }

    public async getStateAsync(publicKey: string): Promise<State | undefined> {
        return this.stateRepository.getStateAsync(publicKey);
    }

    public async setStatesAsync(states: State[]): Promise<void> {
        await this.stateRepository.setStatesAsync(states);
    }

    public async updateStatesAsync(states: State[]): Promise<void> {
        await this.stateRepository.updateStatesAsync(states);
    }

    public async updateStateAsync(publicKey: string, state: State) {
        await this.stateRepository.updateStateAsync(publicKey, state);
    }

    public async getTransactionsByQueryAsync(queries?: object): Promise<Transaction[]> {
        return this.transactionRepository.getTransactionsByQueryAsync(queries);
    }

    public async pruneBlockchainAsync(): Promise<void> {
        await this.blockchainRepository.pruneBlockchainAsync();
    }

    public async pruneStatesAsync(): Promise<void> {
        await this.stateRepository.pruneStatesAsync();
    }
}
