import { ExceptionBase } from "../../shared/errors";

export class TodoNotFoundError extends ExceptionBase {
  static readonly message = "Todo not found";

  public readonly code = "TODO.NOT_FOUND";

  constructor(metadata?: unknown) {
    super(TodoNotFoundError.message, metadata);
  }
}
export class DontBelongsToUserError extends ExceptionBase {
  static readonly message = "Todo dont belongs to user";

  public readonly code = "TODO.DONT_BELONGS_TO_USER";

  constructor(metadata?: unknown) {
    super(DontBelongsToUserError.message, metadata);
  }
}
