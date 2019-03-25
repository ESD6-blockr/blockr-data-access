import { Block, State, Transaction } from "@blockr/blockr-models";
import "reflect-metadata";
import { DataSource } from "./Databases";
import DIContainer from "./injection/container";
import { LevelBlockchainRepository, LevelStateRepository} from "./repositories";
import { MongoBlockchainRepository, MongoStateRepository } from "./repositories";
import { IBlockchainRepository, IStateRepository } from "./repositories";

export class DataAccessLayer {
    private blockchainRepository: IBlockchainRepository;
    private stateRepository: IStateRepository;

    constructor(dataSource: DataSource) {
        if (dataSource === DataSource.LEVEL_DB) {
            this.blockchainRepository = DIContainer.resolve<IBlockchainRepository>(LevelBlockchainRepository);
            this.stateRepository = DIContainer.resolve<IStateRepository>(LevelStateRepository);
            return;
        }

        this.blockchainRepository = DIContainer.resolve<IBlockchainRepository>(MongoBlockchainRepository);
        this.stateRepository = DIContainer.resolve<IStateRepository>(MongoStateRepository);
    }

    public async getBlockchainAsync(): Promise<Block[]> {
        return await this.blockchainRepository.getBlockchainAsync();
    }

    public async setBlocksAsync(blocks: Block[]): Promise<void> {
        await this.blockchainRepository.setBlocksAsync(blocks);
    }

    public async deleteBlocksAsync(blockNumbers: number[]): Promise<void> {
        await this.blockchainRepository.deleteBlocksASync(blockNumbers);
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

    public async updateStateAsync(transactions: Transaction[]): Promise<void> {
        await this.stateRepository.updateStateAsync(transactions);
    }

    public async clearStateAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
