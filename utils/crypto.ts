import * as crypto from "crypto";

export function encrypt(data: string): string {
  const key = generateKey();
  const cipher = crypto.createCipheriv("aes-256-cbc", key, Buffer.alloc(16, 0));
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(data: string): string {
  const key = generateKey();
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.alloc(16, 0)
  );
  let decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

function generateKey(): Buffer {
  const originalKey = process.env.CRYPTO_KEY || "";
  const salt = "salt";
  const iterations = 100000;
  const keyLength = 32;

  const key: Buffer = crypto.pbkdf2Sync(
    originalKey,
    salt,
    iterations,
    keyLength,
    "sha256"
  );
  return key;
}
