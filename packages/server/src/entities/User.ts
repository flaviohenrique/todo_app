import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Todo } from "./todo";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos?: Todo[];

  constructor(name: string, email: string, password: string, id?: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
