import { TodoEntity } from "../todo";
import { TodoRepository } from "../todo.repository";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { ExceptionBase } from "../../../shared/errors";

@Service()
export class ListTodoService {
  constructor(private readonly repository: TodoRepository) {}

  async execute(userId: string): Promise<Result<TodoEntity[], ExceptionBase>> {
    const todos = await this.repository.listByUserId(userId);

    return Result.ok(todos);
  }
}
