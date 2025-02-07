// Função para sanitização de entrada
export function SanitizeInput(input: string): string {
	return input.replace(/['";]/g, "");
}
// Função para verificar entrada
export function VerifyInput(input: string): boolean {
	const invalidCharsRegex = /['";]/g;
	return invalidCharsRegex.test(input);
}
