import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserCredentials } from '../../interfaces'
import Router from 'next/router'
import { ClientApi } from "../../api/client";

const Login = () => {
  const {
    register, handleSubmit, formState
  } = useForm<IUserCredentials>();

  const clientApi = new ClientApi()

  const onSubmit: SubmitHandler<IUserCredentials> = async (data) => {
    try {
      const user = await clientApi.doLogin(data)

      Router.push('/')
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Email:
          <input type="username" defaultValue="flavio.henrique85@gmail.com" {...register("email", { required: true })} />
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
