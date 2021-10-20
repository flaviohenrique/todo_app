import { Todo } from "./../../../entities/todo";
import { TodoRepository } from "../../../repositories/TodoRepository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Result } from "@badrap/result";
import { ExceptionBase } from "../../../shared/errors";

@Service()
export class ListTodoService {
  constructor(
    @InjectRepository(TodoRepository) private repository: TodoRepository
  ) {}

  async execute(): Promise<Result<Todo[], ExceptionBase>> {
    const todos = await this.repository.find();

    return Result.ok(todos);
  }
}
