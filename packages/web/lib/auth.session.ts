import type { IncomingMessage } from "http";
import type { NextApiResponse } from "next";
import type { NextApiRequestCookies } from "next/dist/server/api-utils";
import { GetServerSidePropsContext, GetServerSideProps, GetServerSidePropsResult } from "next";
import { AppStore, wrapper } from "../app/store";
import { logIn } from "../domain/authSlice";

import Iron from "@hapi/iron";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth.cookies";
import { IUser, ISession } from "shared";

const SECRET_COOKIE_PASSWORD = process.env.SECRET_COOKIE_PASSWORD || "";

export async function setUserSession(res: NextApiResponse, user: IUser) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = <ISession>{ ...user, createdAt, maxAge: MAX_AGE };

  const token = await Iron.seal(obj, SECRET_COOKIE_PASSWORD, Iron.defaults);

  setTokenCookie(res, token);
}

export async function getUserSession(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): Promise<ISession> {
  const token = getTokenCookie(req);

  if (!token) throw new Error("Unauthenticated");

  const session = (await Iron.unseal(
    token,
    SECRET_COOKIE_PASSWORD,
    Iron.defaults
  )) as ISession;
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error("Session expired");
  }

  return session;
}

type withAuthenticatedUserCallback<P extends {}> = ((
  context: GetServerSidePropsContext,
  store: AppStore,
  user: IUser
) => Promise<GetServerSidePropsResult<P>>);

export function withAuthenticatedUser<P>(gssp: withAuthenticatedUserCallback<P>) : GetServerSideProps{
  return wrapper.getServerSideProps(store => async (context: GetServerSidePropsContext) => {
    const { req } = context;
    const { dispatch } = store;

    try {
      const user = (await getUserSession(req)) as IUser;

      dispatch(logIn(user));

      return gssp(context, store, user);

    } catch (error) {
      console.log(`Error`, error);

      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }
  });
}
