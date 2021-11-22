import { postJson, getJson, PostResult } from "../lib/http.client";
import { IUser, ITodo, IUserCredentials, ICreateUser } from "shared";
import { apiUrls, getApiUrls } from "./urls";

export type { ResultError } from "../lib/http.client";
export class Api {
  readonly urls: apiUrls;
  constructor() {
    this.urls = getApiUrls();
  }

  doLogin(login: IUserCredentials): Promise<PostResult<IUser>> {
    return postJson<IUserCredentials, IUser>(this.urls.login(), login);
  }

  getTodosByUserId(userId: string): Promise<ITodo[]> {
    return getJson<ITodo[]>(this.urls.todosByUserId(userId));
  }

  createTodo(
    createTodo: Pick<ITodo, "description">
  ): Promise<PostResult<ITodo>> {
    return postJson<Pick<ITodo, "description">, ITodo>(
      this.urls.createTodo(),
      createTodo
    );
  }

  createUser(createUser: ICreateUser): Promise<PostResult<IUser>> {
    return postJson<ICreateUser, IUser>(this.urls.createUser(), createUser);
  }
}
