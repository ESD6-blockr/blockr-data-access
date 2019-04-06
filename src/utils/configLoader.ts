import * as FS from "fs";
import * as Path from "path";
import { decrypt } from "./configEncryption";


export function loadApplicationSettings() {
    /**
     * Encrypted data string
     */
    const encryptedData = FS.readFileSync(Path.resolve(__dirname, "../appsettings.json"), "UTF-8");
    /**
     * Encryption key
     */
    const key: string = process.env.KEY ? process.env.KEY : "";
    /**
     * Encryption initiation vector
     */
    const iv: string = process.env.IV ? process.env.IV : "";
    /**
     * Decrypt file
     */
    const appsettings = decrypt(encryptedData, key, iv);

    return appsettings;
}
