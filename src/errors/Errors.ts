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

export class MaxDistanceError extends Error {
  constructor() {
    super("Too far to check in on selected gym!");
  }
}

export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super("User already checked in today!");
  }
}