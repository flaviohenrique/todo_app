import { UserEntity } from './../modules/users/user';
import { UserRepository } from "../modules/users/user.repository";
import { User } from "../entities/user";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserService {
  constructor(
    private repository: UserRepository
  ) { }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.repository.findById(id);
  }
}
