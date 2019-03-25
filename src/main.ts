import { DataAccessLayer } from "./dataAccessLayer";
import { DataSource } from "./Databases";

/**
 * This class is used for local debugging and should be removed
 */
async function main() {
    const data = new DataAccessLayer(DataSource.MONGO_DB);
    await data.getStatesAsync();
}

main();
