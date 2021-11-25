import { Avatar } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../entities/user.orm.entity";
import { UserCreatedEvent } from "./events";
import { IDomainEvent, IEventedEntity } from "../../infrastructure/events";
import { AvatarEntity, ICreateAvatar } from "./avatar";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
export interface IUserCredentials {
  email: string;
  password: string;
}
export interface IAddAvatar extends ICreateAvatar {
  userId: string;
}

export type FindableUser = Promise<UserEntity | undefined>;

export class UserEntity extends User implements IEventedEntity {
  public readonly domainEvents: IDomainEvent[] = [];

  addDomainEvent(event: IDomainEvent) {
    this.domainEvents.push(event);
  }

  static build(t: User): UserEntity {
    return new UserEntity(t);
  }

  static create(props: ICreateUser): UserEntity {
    const entity = new UserEntity({
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...props,
    });

    entity.addDomainEvent(new UserCreatedEvent(entity.id, entity.name));

    return entity;
  }

  addAvatar(props: ICreateAvatar) {
    const avatar = AvatarEntity.create(props);
    this.avatar = avatar;

    return this.avatar;
  }

  getAvatar(): AvatarEntity | undefined {
    return this.avatar !== undefined
      ? AvatarEntity.build(this.avatar)
      : undefined;
  }
}
