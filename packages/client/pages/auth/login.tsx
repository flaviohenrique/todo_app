import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoggedUser, ILogin } from '../../interfaces'
import { postJson } from '../../lib/http.client'

const Login = () => {
  const {
    register, handleSubmit, formState
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    postJson<ILogin, ILoggedUser>('/api/auth/login', data).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Email:
          <input type="email" defaultValue="flavio.henrique85@gmail.com" {...register("email", { required: true })} />
          {formState.errors.email && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" defaultValue="123456" {...register("password", { required: true })} />
          {formState.errors.password && <span>This field is required</span>}
        </label>
      </div>
      <div>
        <input type="submit" value="Log in" />
      </div>
    </form>
  )
}

export default Login
