import type { NextApiRequest, NextApiResponse } from "next";
import { Api, ResultError } from "../../api";
import { getUserSession } from "../../lib/auth.session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req);

  const api = new Api();

  const result = await api.createTodo({
    ...req.body,
    ...{ userId: session?.id },
  });

  if ((<ResultError>result).message !== undefined) {
    const { status, message } = result as ResultError;
    res.status(status).json({ message: message });
  } else {
    res.status(200).json(result);
  }
};

export default handler;
