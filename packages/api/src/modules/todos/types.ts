import type { TodoEntity } from "./todo";

export type TodoStatus = "active" | "deleted" | "done" | "archived";

export interface ITodoProps {
  description: string;
  moreDescription?: string;
  userId: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateTodo {
  description: string;
  moreDescription?: string;
  userId: string;
}

export interface IUpdateTodo extends ICreateTodo {
  id: string;
}

export interface IDoneTodo {
  id: string;
  userId: string;
}

export type IUpdateDescription = Pick<
  ITodoProps,
  "moreDescription" | "description"
>;

export type TodoDTO = Pick<
  TodoEntity,
  "id" | "description" | "status" | "userId"
>;

export interface ITodoRepository {
  listAll(): Promise<TodoEntity[]>;
  listByUserId(userId: string): Promise<TodoEntity[]>;
  findById(todoId: string): Promise<TodoEntity | undefined>;
  save(todo: TodoEntity): Promise<TodoEntity>;
}
