import { UserRepository } from "../../../repositories/UserRepository";
import { User } from "../../../entities/user"
import { Service } from "typedi";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Result } from '@badrap/result'
import { UserAlreadyExistsError } from "../errors";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

@Service()
export class CreateUserService {
  constructor(@InjectRepository(UserRepository) private repository: UserRepository) { }

  async call(createUser: ICreateUser): Promise<Result<User, UserAlreadyExistsError>> {

    if (await this.repository.exists(createUser.email)) {
      return Result.err<UserAlreadyExistsError>(new UserAlreadyExistsError())
    }

    const user = new User(createUser.name, createUser.email, createUser.password)

    const created = await this.repository.save(user)

    return Result.ok(created)
  }
}
