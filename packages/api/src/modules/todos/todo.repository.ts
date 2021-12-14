import { InjectRepository } from "typeorm-typedi-extensions";
import { TodoEntity } from "./todo";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { Todo } from "../../entities/todo.orm.entity";
import { BaseRepository } from "../../infra/repositories";
import { TodoMapper } from "./mapper";
import type { Findable } from "../../shared/types";
import { ITodoRepository } from "./types";

@Service()
export class TodoRepository extends BaseRepository implements ITodoRepository {
  constructor(@InjectRepository(Todo) private repository: Repository<Todo>) {
    super();
  }

  async listAll(): Promise<TodoEntity[]> {
    return ((await this.repository.find()) || []).map(TodoMapper.toDomain);
  }

  async listByUserId(userId: string): Promise<TodoEntity[]> {
    return (
      (await this.repository.find({
        where: { userId },
        order: { createdAt: "ASC" },
      })) || []
    ).map(TodoMapper.toDomain);
  }

  async findById(todoId: string): Findable<TodoEntity> {
    const todo = await this.repository.findOne(todoId);

    if (todo) return TodoMapper.toDomain(todo);

    return todo;
  }

  async save(entity: TodoEntity): Promise<TodoEntity> {
    await this.repository.save(TodoMapper.toPersistence(entity));

    return entity;
  }
}
