import { ExceptionBase } from "../../shared/errors";

export class UserNotFoundError extends ExceptionBase {
  static readonly message = "User not found";

  public readonly code = "USER.NOT_FOUND";

  constructor(metadata?: unknown) {
    super(UserNotFoundError.message, metadata);
  }
}

export class UserAlreadyExistsError extends ExceptionBase {
  static readonly message = "User already exists";

  public readonly code = "USER.ALREADY_EXISTS";

  constructor(metadata?: unknown) {
    super(UserAlreadyExistsError.message, metadata);
  }
}
