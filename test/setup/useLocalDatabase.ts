import "dotenv/config";

const requiredEnvVars = {
	DATABASE_URL: "postgresql://root:admin@localhost:5432/api-nest",
	DIRECT_URL: "postgresql://root:admin@localhost:5432/api-nest",
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
	if (process.env[key] !== value) {
		throw new Error(
			`A variável de ambiente ${key} deve ser definida como ${value}.`
		);
	}
}
