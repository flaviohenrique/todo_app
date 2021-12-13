import { TodoRepository } from "../todo.repository";
import { TodoEntity } from "../../todos/todo";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { ExceptionBase } from "../../../shared/errors";
import type { ICreateTodo } from "../types";

@Service()
export class CreateTodoByUserService {
  constructor(private readonly repository: TodoRepository) {}

  async execute(
    createTodo: ICreateTodo
  ): Promise<Result<TodoEntity, ExceptionBase>> {
    const todo = TodoEntity.create(createTodo);

    const created = await this.repository.save(todo);

    return Result.ok(created);
  }
}
