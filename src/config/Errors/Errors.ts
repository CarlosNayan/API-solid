export const UserAlreadyExistsError = {
	message: "E-mail or CPF já cadastrados",
	code: 409,
};

export const InvalidCredentialsError = {
	message: "Credenciais inválidas",
	code: 400,
};

export const ResourceNotFoundError = {
	message: "Dados não encontrados",
	code: 404,
};

export const InvalidCpfUser = {
	message: "CPF inválido",
	code: 400,
};

export const InvalidNameRegex = {
	message: "O nome contém caracteres inválidos.",
	code: 400,
};

export const InvalidEmailRegex = {
	message: "O nome contém caracteres inválidos.",
	code: 400,
};

export const MaxDistanceError = {
	message: "Too far to check in on selected gym!",
	code: 400,
};

export const MaxNumberOfCheckInsError = {
	message: "User already checked in today!",
	code: 400,
};

export const LateCheckinValidationError = {
	message:
		"The check-in can only be validated until 20 minutes of its creation!",
	code: 400,
};
