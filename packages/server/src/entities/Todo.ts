import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  description: string;
  @Column({
    nullable: true,
  })
  more_description?: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user?: User;

  constructor(
    description: string,
    createdAt: Date,
    updatedAt: Date,
    id?: number,
    more_description?: string
  ) {
    this.id = id;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.more_description = more_description;
  }
}
