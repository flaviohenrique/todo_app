import { StreamResult, ResultError } from "./../../../lib/http.client";

import type { NextApiRequest, NextApiResponse } from "next";
import { ExternalApi } from "../../../services";
import { getUserSession } from "../../../lib/auth.session";

import multer from "multer";

import nc from "next-connect";

const upload = multer({ storage: multer.memoryStorage() }).single("avatar");

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const api = new ExternalApi();

  const session = await getUserSession(req);

  const result = await api.getAvatarImg(session.id);

  if ((result as StreamResult).contentType !== undefined) {
    const data = result as StreamResult;
    res.setHeader("Content-type", data.contentType);
    res.status(200);
    res.send(data.body);
  } else {
    const data = result as ResultError;
    res.status(data.status).send(data.message);
    res.end();
  }
});

handler.put(upload, async (req, res) => {
  const api = new ExternalApi();

  const session = await getUserSession(req);

  const result = await api.putAvatarImg(session.id, req.file);

  if ((result as ResultError).message !== undefined) {
    const data = result as ResultError;
    res.status(data.status).send(data.message);
    res.end();
  } else {
    res.status(200).send(result);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
