import { postJson, getJson, PostResult } from "../lib/http.client";
import { IUser, ITodo, IUserCredentials } from "shared";

export class Api {
  doLogin(login: IUserCredentials): Promise<PostResult<IUser>> {
    return postJson<IUserCredentials, IUser>(
      `${process.env.HOST}/users/login`,
      login
    );
  }

  getAllTodos(): Promise<ITodo[]> {
    return getJson<ITodo[]>(`${process.env.HOST}/todos`);
  }
}
