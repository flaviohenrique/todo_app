import { UserRepository } from './../../../repositories/UserRepository';
import { TodoRepository } from "../../../repositories/TodoRepository";
import { TodoEntity, ICreateTodo } from "../../todos/todo";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Result } from "@badrap/result";
import { UserNotFoundError } from '../errors';

@Service()
export class CreateTodoByUserService {
  constructor(
    @InjectRepository(TodoRepository) private repository: TodoRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) { }

  async execute(
    createTodo: ICreateTodo
  ): Promise<Result<TodoEntity, UserNotFoundError>> {
    if (await this.userRepository.findOne(createTodo.userId) === undefined) {
      return Result.err<UserNotFoundError>(new UserNotFoundError());
    }

    const todo = TodoEntity.create(createTodo);

    const created = await this.repository.save(todo);

    return Result.ok(created);
  }
}
