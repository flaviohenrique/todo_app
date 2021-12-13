import { v4 as uuidv4 } from "uuid";
import { Entity } from "../../shared/entity";
import type { IAvatarProps, ICreateAvatar } from "./types";

export class AvatarEntity extends Entity<IAvatarProps> {
  get name(): string {
    return this.props.name;
  }
  get mimetype(): string {
    return this.props.mimetype;
  }

  get data(): Buffer {
    return this.props.data;
  }

  get id(): string {
    return this._id;
  }

  static create(create: ICreateAvatar): AvatarEntity {
    const id = uuidv4();

    const entity = new AvatarEntity(
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...create,
      },
      id
    );

    return entity;
  }
}
