import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../entities/user.orm.entity";
import { UserEntity } from "./user";
import { UserCreatedEvent } from "./events";
import { DomainEvents } from "../../infrastructure/events";
import { BaseRepository } from "../../infrastructure/repositories";

@Service()
export class UserRepository extends BaseRepository {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    protected domainEventsController: DomainEvents
  ) {
    super();
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    const user = await this.repository.findOne({ email });

    if (user) return new UserEntity(user);

    return user;
  }

  async findById(userId: string): Promise<UserEntity | undefined> {
    const user = await this.repository.findOne(userId);

    if (user) return new UserEntity(user);

    return user;
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findByEmail(email);
    return found ? true : false;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    await this.repository.save(user);

    this.dispatchEvents(user, UserCreatedEvent.eventName);

    return user;
  }
}
