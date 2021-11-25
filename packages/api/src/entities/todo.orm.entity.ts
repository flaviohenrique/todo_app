import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.orm.entity";
import { EntityBase } from "../infrastructure/database/entity.base";

export enum TodoStatus {
  ACTIVE = "active",
  DELETED = "deleted",
  DONE = "done",
  ARCHIVED = "archived",
}

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

  @Column({ type: "enum", enum: TodoStatus, default: TodoStatus.ACTIVE })
  status: TodoStatus = TodoStatus.ACTIVE;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: "userId" })
  _user?: User;
}
