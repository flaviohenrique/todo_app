import Local from 'passport-local'
import { Api } from '../api'
import { ResultError } from './http.client';

const api = new Api()

export const localStrategy = new Local.Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  const result = await api.doLogin({ email, password })

  if ((<ResultError>result).message !== undefined) {
    done(new Error((<ResultError>result).message), null)
  } else {
    done(null, result)
  }
})
