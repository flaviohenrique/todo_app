import { UserRepository } from "../user.repository";
import { UserEntity, ICreateUser } from "../../users/user";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { UserAlreadyExistsError } from "../errors";

@Service()
export class CreateUserService {
  constructor(private repository: UserRepository) {}

  async execute(
    createUser: ICreateUser
  ): Promise<Result<UserEntity, UserAlreadyExistsError>> {
    if (await this.repository.exists(createUser.email)) {
      return Result.err<UserAlreadyExistsError>(new UserAlreadyExistsError());
    }

    const user = UserEntity.create(createUser);

    const created = await this.repository.create(user);

    return Result.ok(created);
  }
}
