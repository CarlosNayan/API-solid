export function generateToken(length: number): string {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let token = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		token += charset[randomIndex];
	}
	return token;
}
