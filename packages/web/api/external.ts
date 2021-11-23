import { ICreateUser, ITodo, IUser, IUserCredentials } from "shared";
import { getJson, postJson, Result } from "../lib/http.client";

export class ExternalApi {
  readonly basePath: string;

  constructor() {
    this.basePath = process.env.HOST ?? "";
  }

  doLogin(login: IUserCredentials): Promise<Result<IUser>> {
    return postJson<IUserCredentials, IUser>(
      `${this.basePath}/users/login`,
      login
    );
  }

  getTodosByUserId(userId: string): Promise<Result<ITodo[]>> {
    return getJson<ITodo[]>(`${this.basePath}/todos?userId=${userId}`);
  }

  createTodo(createTodo: Pick<ITodo, "description">): Promise<Result<ITodo>> {
    return postJson<Pick<ITodo, "description">, ITodo>(
      `${this.basePath}/todos`,
      createTodo
    );
  }

  createUser(createUser: ICreateUser): Promise<Result<IUser>> {
    return postJson<ICreateUser, IUser>(`${this.basePath}/users`, createUser);
  }
}
