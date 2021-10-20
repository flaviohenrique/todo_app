import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../entities/todo";

export interface ICreateTodo {
  description: string;
  moreDescription?: string;
  userId: string
}

export class TodoEntity extends Todo {
  static create(create: ICreateTodo): TodoEntity {
    const id = uuidv4();

    return new TodoEntity({
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
    });
  }
}
