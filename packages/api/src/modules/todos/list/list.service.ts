import { TodoEntity } from "../todo";
import { TodoRepository } from "../todo.repository";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { ExceptionBase } from "../../../shared/errors";

@Service()
export class ListTodoService {
  constructor(private readonly repository: TodoRepository) {}

  async execute(): Promise<Result<TodoEntity[], ExceptionBase>> {
    const todos = await this.repository.listAll();

    return Result.ok(todos);
  }
}
