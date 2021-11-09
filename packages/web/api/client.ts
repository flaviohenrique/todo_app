import { postJson, PostResult } from "../lib/http.client";
import { IUser, IUserCredentials } from "../interfaces/index";

export class ClientApi {
  doLogin(login: IUserCredentials): Promise<PostResult<IUser>> {
    return postJson<IUserCredentials, IUser>('/api/auth/login', login);
  }
}
