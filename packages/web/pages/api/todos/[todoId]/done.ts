import type { NextApiRequest, NextApiResponse } from "next";
import { ExternalApi } from "../../../../services";
import { getUserSession } from "../../../../lib/auth.session";

import nc from "next-connect";
import { buildJsonResponse } from "../../../../lib/api";

type NextApiRequestWithTodoId = NextApiRequest & {
  query: {
    todoId: string;
  };
};

const handler = nc<NextApiRequestWithTodoId, NextApiResponse>().put(
  async (req, res) => {
    const session = await getUserSession(req);

    const api = new ExternalApi();

    const result = await api.doneTodo({
      id: req.query.todoId,
      userId: session?.id,
    });

    buildJsonResponse(res, result);
  }
);

export default handler;
