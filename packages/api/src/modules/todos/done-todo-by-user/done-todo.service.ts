import { Service } from "typedi";
import { TodoRepository } from "../todo.repository";
import { TodoEntity } from "../todo";
import { Result } from "@badrap/result";
import { TodoNotFoundError, DontBelongsToUserError } from "../errors";
import { IDoneTodo } from "../types";

@Service()
export class DoneTodoByUserService {
  constructor(private readonly repository: TodoRepository) {}

  async execute(
    doneTodo: IDoneTodo
  ): Promise<Result<TodoEntity, TodoNotFoundError | DontBelongsToUserError>> {
    const todo = await this.repository.findById(doneTodo.id);

    if (todo === undefined) {
      return Result.err<TodoNotFoundError>(new TodoNotFoundError());
    }

    if (!todo.belongsTo(doneTodo.userId)) {
      return Result.err<DontBelongsToUserError>(new DontBelongsToUserError());
    }

    todo.done();

    const updated = await this.repository.save(todo);

    return Result.ok(updated);
  }
}
