import type { NextApiRequest, NextApiResponse } from "next";
import { ExternalApi, ResultError } from "../../../services";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const api = new ExternalApi();

  const result = await api.createUser({
    ...req.body,
  });

  if ((<ResultError>result).message !== undefined) {
    const { status, message } = result as ResultError;
    res.status(status).json({ message: message });
  } else {
    res.status(201).json(result);
  }
};

export default handler;
