import { v4 as uuidv4 } from "uuid";
import { Todo } from "../../entities/todo.orm.entity";

interface ITodoProps {
  description: string;
  moreDescription?: string;
}

export interface ICreateTodo extends ITodoProps {
  userId: string;
}

export interface IUpdateTodo extends ICreateTodo {
  id: string;
}

export class TodoEntity extends Todo {
  belongsTo(userId: string): boolean {
    return this.userId === userId;
  }
  static create(create: ICreateTodo): TodoEntity {
    const id = uuidv4();

    return new TodoEntity({
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
    });
  }

  updateDescriptions(props: ITodoProps) {
    this.moreDescription = props.moreDescription;
    this.description = props.description || "";
    this.updatedAt = new Date();
  }
}
