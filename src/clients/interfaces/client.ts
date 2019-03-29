export interface IClient<Tdatabase> {
    connectAsync(): Promise<Tdatabase>;
    disconnectAsync(): Promise<void>;
}
