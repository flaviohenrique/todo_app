import { v4 as uuidv4 } from "uuid";
import { User } from "../../entities/user.orm.entity";
import { UserCreatedEvent } from "./events";
import { IDomainEvent, IEventedEntity } from "../../infrastructure/events";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export type FindableUser = Promise<UserEntity | undefined>;

export class UserEntity extends User implements IEventedEntity {
  public readonly domainEvents: IDomainEvent[] = [];

  addDomainEvent(event: IDomainEvent) {
    this.domainEvents.push(event);
  }

  static create(create: ICreateUser): UserEntity {
    const entity = new UserEntity({
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
    });

    entity.addDomainEvent(new UserCreatedEvent(entity.id, entity.name));

    return entity;
  }
}
