import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../entities/user.orm.entity";
import { File } from "../../entities/file.orm.entity";
import { IUserCredentials, UserEntity, FindableUser } from "./user";
import { UserCreatedEvent } from "./events";
import { DomainEvents } from "../../infrastructure/events";
import { BaseRepository } from "../../infrastructure/repositories";

@Service()
export class UserRepository extends BaseRepository {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectRepository(File) private fileRepository: Repository<File>,
    protected domainEventsController: DomainEvents
  ) {
    super();
  }

  async findByEmail(email: string): FindableUser {
    const user = await this.repository.findOne({ email });

    if (user) return UserEntity.build(user);

    return user;
  }

  async findByCredentials(credentials: IUserCredentials): FindableUser {
    const user = await this.repository.findOne(credentials);

    if (user) return UserEntity.build(user);

    return user;
  }

  async findById(userId: string): FindableUser {
    const user = await this.repository.findOne(userId);

    if (user) return UserEntity.build(user);

    return user;
  }

  async findByIdWithAvatar(userId: string): FindableUser {
    const user = await this.repository.findOne(userId, { relations: ["avatar"] });

    if (user) return UserEntity.build(user);

    return user;
  }

  async exists(email: string): Promise<boolean> {
    return (await this.findByEmail(email)) ? true : false;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await this.repository.save(user);

    this.dispatchEvents(user, UserCreatedEvent.eventName);

    return user;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    if(user.avatar) {
      await this.fileRepository.save(user.avatar)
    }

    await this.repository.save(user);

    return user;
  }
}
