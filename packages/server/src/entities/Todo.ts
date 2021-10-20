import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { EntityBase } from "../infrastructure/database/entity.base";

@Entity()
export class Todo extends EntityBase {
  constructor(props?: Partial<Todo>) {
    super(props);
  }

  @Column()
  description!: string;
  @Column({
    nullable: true,
  })
  moreDescription?: string;

  @ManyToOne(() => User, (user) => user.todos)
  user?: User;
}
