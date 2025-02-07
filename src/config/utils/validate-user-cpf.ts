export const validateUserCpf = (cpf: string): boolean => {
	cpf = cpf.replace(/\D/g, "");

	if (cpf.length !== 11) {
		return false;
	}

	if (/^(\d)\1{10}$/.test(cpf)) {
		return false;
	}

	const calcResto = (factor: number): number =>
		([...cpf.slice(0, factor - 1)].reduce(
			(sum, digit, i) => sum + Number(digit) * (factor - i),
			0
		) *
			10) %
		11;

	const [resto1, resto2] = [calcResto(10), calcResto(11)];

	if (resto1 !== Number(cpf[9]) || resto2 !== Number(cpf[10])) {
		return false;
	}

	return true;
};
