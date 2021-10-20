import { ExceptionBase } from "../../shared/errors";

export class UserNotFoundError extends ExceptionBase {
  static readonly message = "User not found";

  public readonly code = "USER.NOT_FOUND";

  constructor(metadata?: unknown) {
    super(UserNotFoundError.message, metadata);
  }
}
