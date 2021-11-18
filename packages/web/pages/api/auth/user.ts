import type { NextApiRequest, NextApiResponse } from "next";

import { getUserSession } from "../../../lib/auth.session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getUserSession(req);

  try {
    console.log("@@@@@@@", session?.name);

    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
};

export default handler;
