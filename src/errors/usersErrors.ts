export class UserAlreadyExistsError extends Error {
  constructor() {
    super("E-mail already exists.");
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid credentials error.");
  }
}

export class ResourceNotFoundError extends Error {
  constructor() {
    super("ResourceNotFound.");
  }
}
