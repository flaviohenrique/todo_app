import { Entity, Column } from "typeorm";
import { EntityBase } from "../infrastructure/database/entity.base";

@Entity()
export class User extends EntityBase {
  constructor(props?: Partial<User>) {
    super(props);
  }

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;
}
