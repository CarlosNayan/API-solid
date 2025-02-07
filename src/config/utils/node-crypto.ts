import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";
import "dotenv/config";

// Chave secreta para criptografia e descriptografia (deve ser 32 bytes para AES-256)
const secretKey = process.env.CRYPTO_SECRET_KEY!;

const iv = randomBytes(16).toString("hex");

// Função para codificar (criptografar) os dados
export async function encrypt(text): Promise<string> {
	const cipher = createCipheriv(
		"aes-256-cbc",
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return `${iv}:${encrypted}`; // Retorna o IV junto com o texto criptografado
}

// Função para decodificar (descriptografar) os dados
export async function decrypt(encryptedText): Promise<string> {
	const [iv, encrypted] = encryptedText.split(":");
	const decipher = createDecipheriv(
		"aes-256-cbc",
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}

// Função para decodificar (descriptografar) os dados
export async function compare(encryptedText, textToCompare): Promise<boolean> {
	const [iv, encrypted] = encryptedText.split(":");
	const decipher = createDecipheriv(
		"aes-256-cbc",
		Buffer.from(secretKey, "hex"),
		Buffer.from(iv, "hex")
	);
	let decrypted = decipher.update(encrypted, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted === textToCompare;
}

// Exemplo de uso
(async () => {
	const token = "mySecretToken";

	// Codifica (criptografa) o token
	const encryptedToken = await encrypt(token);
	console.log("Encrypted Token:", encryptedToken);

	// Decodifica (descriptografa) o token
	const decryptedToken = await decrypt(encryptedToken);
	console.log("Decrypted Token:", decryptedToken);
})();
