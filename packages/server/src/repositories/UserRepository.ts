import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ email });
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findByEmail(email)
    return found ? true : false
  }
}
