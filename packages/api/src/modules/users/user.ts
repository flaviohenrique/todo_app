import { v4 as uuidv4 } from "uuid";
import { AggregateRoot } from "../../shared/aggregate-root";
import { UserCreatedEvent } from "./events";
import { AvatarEntity } from "./avatar";
import type { ICreateAvatar, ICreateUser, IUserProps } from "./types";

export class UserEntity extends AggregateRoot<IUserProps> {
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }

  static create(create: ICreateUser): UserEntity {
    const id = uuidv4();
    const props: IUserProps = {
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
    };

    const user = new UserEntity(props, id);

    user.addDomainEvent(new UserCreatedEvent(user.id, user.name));

    return user;
  }

  addAvatar(props: ICreateAvatar): AvatarEntity {
    const avatar = AvatarEntity.create(props);
    this.props.avatar = avatar;

    return avatar;
  }

  get avatar(): AvatarEntity | undefined {
    return this.props.avatar;
  }
}
