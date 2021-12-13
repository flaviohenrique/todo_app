import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../../entities/user.orm.entity";
import { File } from "../../entities/file.orm.entity";
import { UserCreatedEvent } from "./events";
import { DomainEvents } from "../../infrastructure/events";
import { BaseRepository } from "../../infrastructure/repositories";
import { UserMapper, AvatarMapper } from "./mapper";
import { UserEntity } from "./user";
import type { IUserCredentials, IUserRepository } from "./types";
import { Findable } from "../../shared/types";

@Service()
export class UserRepository extends BaseRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @InjectRepository(File) private fileRepository: Repository<File>,
    protected domainEventsController: DomainEvents
  ) {
    super();
  }

  async findByEmail(email: string): Findable<UserEntity> {
    const user = await this.repository.findOne({ email });

    if (user) return UserMapper.toDomain(user);

    return user;
  }

  async findByCredentials(credentials: IUserCredentials): Findable<UserEntity> {
    const user = await this.repository.findOne(credentials);

    if (user) return UserMapper.toDomain(user);

    return user;
  }

  async findById(userId: string): Findable<UserEntity> {
    const user = await this.repository.findOne(userId);

    if (user) return UserMapper.toDomain(user);

    return user;
  }

  async findByIdWithAvatar(userId: string): Findable<UserEntity> {
    const user = await this.repository.findOne(userId, {
      relations: ["avatar"],
    });

    if (user) return UserMapper.toDomain(user);

    return user;
  }

  async exists(email: string): Promise<boolean> {
    return (await this.findByEmail(email)) ? true : false;
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    await this.repository.save(UserMapper.toPersistence(entity));

    this.dispatchEvents(entity, UserCreatedEvent.eventName);

    return entity;
  }

  async update(user: UserEntity): Promise<UserEntity> {
    if (user.avatar) {
      await this.fileRepository.save(AvatarMapper.toPersistence(user.avatar));
    }

    await this.repository.save(UserMapper.toPersistence(user));

    return user;
  }
}
