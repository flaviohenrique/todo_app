import { Findable } from "../../shared/types";
import type { AvatarEntity } from "./avatar";
import type { UserEntity } from "./user";

export interface IAvatarProps {
  name: string;
  mimetype: string;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAvatar {
  name: string;
  mimetype: string;
  data: Buffer;
}

export type AvatarDTO = Pick<AvatarEntity, "id" | "name" | "mimetype">;

export interface IUserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: AvatarEntity;
}

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

export type UserDTO = Pick<UserEntity, "id" | "name" | "email"> & {
  avatar?: AvatarDTO;
};

export interface IUserRepository {
  findByEmail(email: string): Findable<UserEntity>;
  findByCredentials(credentials: IUserCredentials): Findable<UserEntity>;
  findById(userId: string): Findable<UserEntity>;
  findByIdWithAvatar(userId: string): Findable<UserEntity>;
  exists(email: string): Promise<boolean>;
  create(user: UserEntity): Promise<UserEntity>;
  update(user: UserEntity): Promise<UserEntity>;
}
