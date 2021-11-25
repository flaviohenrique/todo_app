import { v4 as uuidv4 } from "uuid";
import { File } from "../../entities/file.orm.entity";

export interface ICreateAvatar {
  name: string;
  mimetype: string;
  data: Buffer;
}

export class AvatarEntity extends File {
  static build(t: File): AvatarEntity {
    return new AvatarEntity(t);
  }

  static create(create: ICreateAvatar): AvatarEntity {
    const entity = new AvatarEntity({
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
    });

    return entity;
  }
}
