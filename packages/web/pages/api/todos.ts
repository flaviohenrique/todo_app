import type { NextApiRequest, NextApiResponse } from "next";
import { ExternalApi, ResultError, Result } from "../../api";
import { getUserSession } from "../../lib/auth.session";

import nc from "next-connect";

function buildResponse<T>(res: NextApiResponse, result: Result<T>): void {
  if ((<ResultError>result).message !== undefined) {
    const { status, message } = result as ResultError;
    res.status(status).json({ message: message });
  } else {
    res.status(200).json(result);
  }
}

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const session = await getUserSession(req);

    const api = new ExternalApi();

    const result = await api.getTodosByUserId(<string>session?.id);

    buildResponse(res, result);
  })
  .post(async (req, res) => {
    const session = await getUserSession(req);

    const api = new ExternalApi();

    const result = await api.createTodo({
      ...req.body,
      ...{ userId: session?.id },
    });

    buildResponse(res, result);
  });

export default handler;
