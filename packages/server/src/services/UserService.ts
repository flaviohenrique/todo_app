import { UserRepository } from './../repositories/UserRepository';
import { User } from "../entities/user";
import { Service } from "typedi";
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService {
  constructor(@InjectRepository(UserRepository) private repository: UserRepository) { }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async list(): Promise<User[] | undefined> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  // async create(params: UserCreateParams): Promise<User | undefined> {
  //   const user = new User(params.name, params.email, params.password);

  //   return this.repository.save(user);
  // }
}
