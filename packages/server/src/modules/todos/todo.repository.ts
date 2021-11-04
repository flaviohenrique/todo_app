import { InjectRepository } from 'typeorm-typedi-extensions';
import { TodoEntity } from './todo';
import { Service } from "typedi";
import { Repository } from "typeorm";
import { Todo } from "../../entities/todo.orm.entity";

@Service()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo) private repository: Repository<Todo>
  ) { }

  async listAll(): Promise<TodoEntity[]> {
    return (await this.repository.find() || []).map<TodoEntity>(t => new TodoEntity(t))
  }

  async findById(todoId: string): Promise<TodoEntity | undefined> {
    const todo = await this.repository.findOne(todoId);

    if (todo) return new TodoEntity(todo)

    return todo
  }

  async save(todo: TodoEntity): Promise<TodoEntity> {
    await this.repository.save(todo)

    return todo
  }
}
