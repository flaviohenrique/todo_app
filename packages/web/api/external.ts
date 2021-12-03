import { request, ServerResponse } from "http";
import {
  IAddedAvatar,
  ICreateUser,
  ITodo,
  IUser,
  IUserCredentials,
} from "shared";
import {
  getJson,
  postJson,
  Result,
  getStream,
  StreamResult,
  putForm,
} from "../lib/http.client";
import FormData from "form-data";
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

  getAvatarImg(userId: string): Promise<Result<StreamResult>> {
    return getStream(`${this.basePath}/users/${userId}/avatar`);
  }

  putAvatarImg(
    userId: string,
    file: Express.Multer.File | undefined
  ): Promise<Result<IAddedAvatar>> {
    const form = new FormData();

    form.append("avatar", file?.buffer, {
      contentType: file?.mimetype,
      filename: file?.filename,
      filepath: file?.originalname,
    });

    return putForm<IAddedAvatar>(
      `${this.basePath}/users/${userId}/avatar`,
      form
    );
  }
}
