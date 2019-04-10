import "reflect-metadata";

import { Block, State, Transaction } from "@blockr/blockr-models";
import { inject, injectable } from "inversify";
import { DataSource } from "./clients";
import DIContainer from "./injection/container";
import { LevelBlockchainRepository, LevelStateRepository } from "./repositories";
import { MongoBlockchainRepository, MongoStateRepository } from "./repositories";
import { IBlockchainRepository, IStateRepository } from "./repositories";

@injectable()
export class DataAccessLayer {
    private blockchainRepository: IBlockchainRepository;
    private stateRepository: IStateRepository;

    constructor(@inject("DataSource") dataSource: DataSource) {
        switch (dataSource) {
            case DataSource.LEVEL_DB:
                this.blockchainRepository = DIContainer.resolve<IBlockchainRepository>(LevelBlockchainRepository);
                this.stateRepository = DIContainer.resolve<IStateRepository>(LevelStateRepository);
                break;
            case DataSource.MONGO_DB:
                this.blockchainRepository = DIContainer.resolve<IBlockchainRepository>(MongoBlockchainRepository);
                this.stateRepository = DIContainer.resolve<IStateRepository>(MongoStateRepository);
                break;
            default:
                throw new Error("Unrecognised dataSource");
        }
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        return await this.blockchainRepository.getBlockchainAsync();
    }

    public async getBlockAsync(blockNumber: number): Promise<Block> {
        return await this.blockchainRepository.getBlockAsync(blockNumber);
    }

    public async setBlocksAsync(blocks: Block[]): Promise<void> {
        await this.blockchainRepository.setBlocksAsync(blocks);
    }

    public async deleteBlocksAsync(blockNumbers: number[]): Promise<void> {
        await this.blockchainRepository.deleteBlocksAsync(blockNumbers);
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
}
