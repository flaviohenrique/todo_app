import { TodoRepository } from "../todo.repository";
import { TodoEntity, IUpdateTodo } from "../todo";
import { Inject, Service } from "typedi";
import { Result } from "@badrap/result";
import { TodoNotFoundError, DontBelongsToUserError } from '../errors';

@Service()
export class UpdateTodoByUserService {
  constructor(
    private readonly repository: TodoRepository,
  ) { }

  async execute(updateTodo: IUpdateTodo
  ): Promise<Result<TodoEntity, TodoNotFoundError | DontBelongsToUserError>> {
    const todo = await this.repository.findById(updateTodo.id)

    if (todo === undefined) {
      return Result.err<TodoNotFoundError>(new TodoNotFoundError());
    }

    if (!todo.belongsTo(updateTodo.userId)) {
      return Result.err<DontBelongsToUserError>(new DontBelongsToUserError());
    }


    todo.updateDescriptions(updateTodo)

    const updated = await this.repository.save(todo);

    return Result.ok(updated);
  }
}
