import { IAddedAvatar, IDoneTodo } from "./../../shared/index.d";
import {
  ICreateTodo,
  ICreateUser,
  ITodo,
  IUser,
  IUserCredentials,
} from "shared";
import {
  getJson,
  putFile,
  putJson,
  postJson,
  Result,
} from "../lib/http.client";

export class ClientApi {
  readonly basePath: string;

  constructor() {
    this.basePath = "/api";
  }

  doLogin(login: IUserCredentials): Promise<Result<IUser>> {
    return postJson<IUserCredentials, IUser>(
      `${this.basePath}/auth/login`,
      login
    );
  }

  doneTodo(todoId: string) {
    return putJson<undefined, ITodo>(`${this.basePath}/todos/${todoId}/done`);
  }

  getTodos(): Promise<Result<ITodo[]>> {
    return getJson<ITodo[]>(`${this.basePath}/todos`);
  }

  createTodo(createTodo: ICreateTodo): Promise<Result<ITodo>> {
    return postJson<ICreateTodo, ITodo>(`${this.basePath}/todos`, createTodo);
  }

  createUser(createUser: ICreateUser): Promise<Result<IUser>> {
    return postJson<ICreateUser, IUser>(
      `${this.basePath}/auth/signup`,
      createUser
    );
  }

  AddAvatar(file: File): Promise<Result<IAddedAvatar>> {
    return putFile<IAddedAvatar>(`${this.basePath}/users/avatar-image`, file);
  }
}
