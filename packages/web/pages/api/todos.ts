import type { NextApiRequest, NextApiResponse } from "next";
import { ExternalApi } from "../../services";
import { getUserSession } from "../../lib/auth.session";

import nc from "next-connect";
import { buildJsonResponse } from "../../lib/api";

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const session = await getUserSession(req);

    const api = new ExternalApi();

    const result = await api.getTodosByUserId(<string>session?.id);

    buildJsonResponse(res, result);
  })
  .post(async (req, res) => {
    const session = await getUserSession(req);

    const api = new ExternalApi();

    const result = await api.createTodo({
      ...req.body,
      ...{ userId: session?.id },
    });

    buildJsonResponse(res, result);
  });

export default handler;
