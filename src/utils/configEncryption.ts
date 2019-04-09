import * as Crypto from "crypto";

export function encrypt(data: string, key: string, iv: string): string {
    key = Crypto.createHash("sha256").update(String(key)).digest("base64").slice(0, 32);
    const cipher = Crypto.createCipheriv("aes-256-ctr", key, iv.slice(0, 16));
    return cipher.update(data, "utf8", "hex") + cipher.final("hex");
}

export function decrypt(data: string, key: string, iv: string) {
    key = Crypto.createHash("sha256").update(String(key)).digest("base64").slice(0, 32);
    const decipher = Crypto.createDecipheriv("aes-256-ctr", key, iv.slice(0, 16));
    const decrypted = decipher.update(data, "hex", "utf8") + decipher.final("utf8");
    return JSON.parse(decrypted);
}
