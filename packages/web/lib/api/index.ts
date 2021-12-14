import { NextApiResponse } from "next";
import { Result, ResultError } from "../http.client";

export function buildJsonResponse<T>(
  res: NextApiResponse,
  result: Result<T>
): void {
  if ((<ResultError>result).message !== undefined) {
    const { status, message } = result as ResultError;
    res.status(status).json({ message: message });
  } else {
    res.status(200).json(result);
  }
}
