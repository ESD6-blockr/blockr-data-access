import * as FS from "fs";
import * as Path from "path";
import { decrypt, encrypt } from "../utils/configEncryption";

/**
 * Test class for encrypting and decrypting the application settings
 */

const key = "";
const iv = "";

test("Encrypt config", () => {
    const file = FS.readFileSync(Path.resolve(__dirname, "../appsettings.plain.json"), "UTF-8");
    const encrypted = encrypt(file, key, iv);
    FS.writeFileSync(Path.resolve(__dirname, "../appsettings.json"), encrypted);
});


test("Decrypt config", () => {
    const encryted = FS.readFileSync(Path.resolve(__dirname, "../appsettings.enc.json"), "UTF-8");
    const decrypted = decrypt(encryted, key, iv);
    FS.writeFileSync(Path.resolve(__dirname, "../appsettings.plain.json"), decrypted);
});
