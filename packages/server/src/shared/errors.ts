export interface SerializedException {
  message: string;
  code: string;
  stack?: string;
  metadata?: unknown;
}

export abstract class ExceptionBase extends Error {
  constructor(readonly message: string, readonly metadata?: unknown) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  abstract code: string;

  toJSON(ignoreStack = false): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: ignoreStack ? undefined : this.stack,
      metadata: this.metadata,
    };
  }
}
