import { injectable } from "inversify";
import { IDatabase } from "../interfaces/database";

@injectable()
export class LevelDB implements IDatabase {
    public async connectAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async disconnectAsync(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
