export class UserAlreadyExistsError extends Error {
	constructor(){
		super('Email já cadastrado por outro usuário')
	}
}