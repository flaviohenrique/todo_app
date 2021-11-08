import type { NextApiRequest, NextApiResponse } from "next";
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth.cookies'

const SECRET_COOKIE_PASSWORD = process.env.SECRET_COOKIE_PASSWORD || ""

export async function setLoginSession(res: NextApiResponse, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = await Iron.seal(obj, SECRET_COOKIE_PASSWORD, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req: NextApiRequest) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = await Iron.unseal(token, SECRET_COOKIE_PASSWORD, Iron.defaults)
  const expiresAt = session.createdAt + session.maxAge * 1000

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}

export const requiresAuthentication = (gssp: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context

    if (!req.headers.authorization) {
      return {
        redirect: {
          permanent: false,
          destination: '/auth/login',
        },
      };
    }

    console.log('req logged')

    return await gssp(context);
  }
}