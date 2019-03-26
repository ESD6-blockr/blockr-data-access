import "reflect-metadata"; // This is important and needs to be moved!
import { DataSource } from "./clients";
import { DataAccessLayer } from "./dataAccessLayer";

/**
 * This class is used for local debugging and should be removed
 */
async function main() {
    const data = new DataAccessLayer(DataSource.MONGO_DB);
    await data.getBlockchainAsync();
}

main();
