import passport, { use } from 'passport'
import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { localStrategy } from "../../../lib/passport-local";
import { setLoginSession } from '../../../lib/auth';
import { ILoggedUser } from '../../../interfaces';

//import { ILogin, ILoggedUser } from "../../../interfaces/index"

const handler = nc<NextApiRequest, NextApiResponse>()

const authOptions = { session: false } as passport.AuthenticateOptions

const authenticate = (req: NextApiRequest, res: NextApiResponse) =>
  new Promise<ILoggedUser>((resolve, reject) => {
    passport.authenticate("local", authOptions, (error, loggedData) => {
      if (error) {
        reject(error)
      } else {
        resolve(loggedData)
      }
    })(req, res)
  })

passport.use(localStrategy)

handler
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate(req, res);
  
      const session = { ...user }

      console.log('@@@@ user', user)

      await setLoginSession(res, user)

      res.status(200).send({ done: true })
    } catch (e) {
      const error = (e as Error)
      console.error(error)
      res.status(401).send({ message: error.message })
    }

    // const aa = await passport.authenticate('local', authOptions, async (error, token) => {
    //   if (error) {
    //     console.error("@@@@ error", error)
    //     resp.status(401).send(error.message)
    //   } else {
    //     console.error("@@@@ success", token)
    //     const session = { ...token }

    //     await setLoginSession(resp, session)

    //     resp.status(200).send({ done: true })
    //   }
    // })(req, resp)
  });

export default handler

// function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ILoggedUser>
// ) {
//   const login = req.body as ILogin;

//   if (login.email === 'flavio.henrique85@gmail.com' && login.password === '123456') {
//     const user = { id: "1" } as ILoggedUser

//     //req.session.user = user

//     //await req.session.save()

//     res.json(user)
//   }

  //   try {
  //     const {
  //       data: { login, avatar_url },
  //     } = await octokit.rest.users.getByUsername({ username });

  //     const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
  //     req.session.user = user;
  //     await req.session.save();
  //     res.json(user);
  //   } catch (error) {
  //     res.status(500).json({ message: (error as Error).message });
  //   }

//}




// import type { User } from "./user";

// import { Octokit } from "octokit";
// import { withIronSessionApiRoute } from "iron-session/next";
// import { sessionOptions } from "lib/session";
// import { NextApiRequest, NextApiResponse } from "next";
// const octokit = new Octokit();

// export default withIronSessionApiRoute(loginRoute, sessionOptions);

// async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
//   const { username } = await req.body;

//   try {
//     const {
//       data: { login, avatar_url },
//     } = await octokit.rest.users.getByUsername({ username });

//     const user = { isLoggedIn: true, login, avatarUrl: avatar_url } as User;
//     req.session.user = user;
//     await req.session.save();
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: (error as Error).message });
//   }
// }
