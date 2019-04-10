import * as Crypto from "crypto";

const KEY_BIT_SIZE: number = 32;
const IV_BIT_SIZE: number = 16;

export function encrypt(data: string, key: string, iv: string): string {
    key = Crypto.createHash("sha256").update(String(key)).digest("base64").slice(0, KEY_BIT_SIZE);
    const cipher = Crypto.createCipheriv("aes-256-ctr", key, iv.slice(0, IV_BIT_SIZE));
    return cipher.update(data, "utf8", "hex") + cipher.final("hex");
}

export function decrypt(data: string, key: string, iv: string) {
    key = Crypto.createHash("sha256").update(String(key)).digest("base64").slice(0, KEY_BIT_SIZE);
    const decipher = Crypto.createDecipheriv("aes-256-ctr", key, iv.slice(0, IV_BIT_SIZE));
    const decrypted = decipher.update(data, "hex", "utf8") + decipher.final("utf8");
    return JSON.parse(decrypted);
}
