import { AvatarEntity } from "./avatar";
import { File } from "../../entities/file.orm.entity";
import { User } from "../../entities/user.orm.entity";
import { UserEntity } from "./user";
import type { AvatarDTO, UserDTO } from "./types";

export class AvatarMapper {
  static toDomain(t: File): AvatarEntity {
    const { id: id, ...props } = t;
    return new AvatarEntity(props, id);
  }

  static toPersistence(entity: AvatarEntity): Partial<File> {
    return {
      id: entity.id,
      ...entity.props,
    };
  }

  static toDTO(avatar: AvatarEntity): AvatarDTO {
    return {
      id: avatar.id,
      name: avatar.name,
      mimetype: avatar.mimetype,
    };
  }
}

export class UserMapper {
  static toDomain(t: User): UserEntity {
    const { avatar: avatar, id: id, ...props } = t;
    return new UserEntity(
      {
        ...props,
        avatar: avatar ? AvatarMapper.toDomain(avatar) : undefined,
      },
      id
    );
  }

  static toPersistence(entity: UserEntity): Partial<User> {
    const { avatar: _avatar, ...props } = entity.props;

    return {
      id: entity.id,
      ...props,
    };
  }

  static toDTO(user: UserEntity): UserDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar ? AvatarMapper.toDTO(user.avatar) : undefined,
    };
  }
}
