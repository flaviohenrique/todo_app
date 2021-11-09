import { removeTokenCookie } from "../../../lib/auth.cookies";

import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  removeTokenCookie(res);

  res.writeHead(302, { Location: "/" });
  res.end();
};

export default handler;
