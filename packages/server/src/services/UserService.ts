import { User, UserCreateParams } from "./../entity/User";
import { Connection, Repository } from "typeorm";

export class UserService {
  private repository: Repository<User>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(User);
  }

  async save(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async list(): Promise<User[] | undefined> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.repository.findOne(id);
  }

  async create(params: UserCreateParams): Promise<User | undefined> {
    const user = new User(params.name, params.email, params.password);

    return this.repository.save(user);
  }
}
