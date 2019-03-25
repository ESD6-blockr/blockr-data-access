export interface IDatabase {
    connectAsync(): Promise<void>;
    disconnectAsync(): Promise<void>;
}
