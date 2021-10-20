import { v4 as uuidv4 } from "uuid";
import { User } from "../../entities/user";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export class UserEntity extends User {
  static create(create: ICreateUser): UserEntity {
    const id = uuidv4();

    return new UserEntity({
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
    });
  }
}
