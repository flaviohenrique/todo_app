import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.orm.entity";
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

  @Column()
  userId!: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "userId" })
  _user?: User;
}
