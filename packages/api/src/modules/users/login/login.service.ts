import { UserRepository } from "../user.repository";
import { UserEntity, IUserCredentials } from "../../users/user";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { UserNotFoundError } from "../errors";

@Service()
export class LoginService {
  constructor(private repository: UserRepository) {}

  async execute(
    credentials: IUserCredentials
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const user = await this.repository.findByCredentials(credentials);

    if (user === undefined) {
      return Result.err<UserNotFoundError>(new UserNotFoundError());
    }

    return Result.ok(user);
  }
}
