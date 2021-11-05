import Local from 'passport-local'
import { ILoggedUser } from '../interfaces'
//import { findUser, validatePassword } from './user'

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done
) {

  if (username === 'flavio.henrique85@gmail.com' && password === '123456') {
    const user = { id: "1" } as ILoggedUser
    done(null, user)
  } else {
    done(new Error('Invalid username and password combination'))
  }

  // findUser({ username })
  //   .then((user) => {
  //     if (user && validatePassword(user, password)) {
  //       done(null, user)
  //     } else {
  //       done(new Error('Invalid username and password combination'))
  //     }
  //   })
  //   .catch((error) => {
  //     done(error)
  //   })
})
