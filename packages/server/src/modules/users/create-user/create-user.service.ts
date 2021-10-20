import { UserRepository } from "../../../repositories/UserRepository";
import { UserEntity, ICreateUser } from "../../users/user";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Result } from "@badrap/result";
import { UserAlreadyExistsError } from "../errors";

@Service()
export class CreateUserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository
  ) {}

  async execute(
    createUser: ICreateUser
  ): Promise<Result<UserEntity, UserAlreadyExistsError>> {
    if (await this.repository.exists(createUser.email)) {
      return Result.err<UserAlreadyExistsError>(new UserAlreadyExistsError());
    }

    const user = UserEntity.create(createUser);

    const created = await this.repository.save(user);

    return Result.ok(created);
  }
}
