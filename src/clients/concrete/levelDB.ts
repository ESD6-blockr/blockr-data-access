import { injectable } from "inversify";
import { IClient } from "../interfaces/client";

@injectable()
export class LevelDB implements IClient<void> {


    public async connectAsync(): Promise<void> {
        throw new Error("implement me");
    }

    public async disconnectAsync(): Promise<void> {
        return;
    }
}
