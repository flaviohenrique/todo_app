import type { IncomingMessage } from "http";
import type { NextApiResponse, PreviewData } from "next";
import type { NextApiRequestCookies } from "next/dist/server/api-utils";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import Iron from "@hapi/iron";
import { MAX_AGE, setTokenCookie, getTokenCookie } from "./auth.cookies";
import { IUser, ISession, AuthPageProps } from "shared";
import { ParsedUrlQuery } from "querystring";

export type GetServerSidePropsWithSession<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<Q, D>,
  user?: IUser
) => Promise<GetServerSidePropsResult<P>>;

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
): Promise<ISession | undefined> {
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

export const requiresAuthentication = <A extends AuthPageProps>(
  gssp?: GetServerSidePropsWithSession<A>
) => {
  return async (
    context: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<A>> => {
    const { req } = context;

    try {
      const user = (await getUserSession(req)) as IUser;

      if (gssp === undefined) {
        return { props: { user: user } } as { props: A };
      }

      const result = (await gssp(context, user)) as { props: A };

      result.props = { ...result.props, user: user };

      return result;
    } catch (error) {
      console.log(`Error`, error);

      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }
  };
};
