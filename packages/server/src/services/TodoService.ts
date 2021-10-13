import { Connection, Repository } from "typeorm";
import { Todo } from "../entity/Todo";

export class TodoService {
  private repository: Repository<Todo>;

  constructor(connection: Connection) {
    this.repository = connection.getRepository(Todo);
  }

  async save(todo: Todo): Promise<void> {
    await this.repository.save(todo);
  }

  async list(): Promise<any> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Todo | undefined> {
    return this.repository.findOne(id);
  }

  async update(
    id: number,
    params: Partial<Todo> = {}
  ): Promise<Todo | undefined> {
    return this.findById(id).then((todo) => {
      if (todo) {
        todo.more_description = params.more_description;
        todo.description = params.description || "";
        todo.updatedAt = new Date();

        return this.repository.save(todo);
      }
    });
  }

  async delete(id: number): Promise<Todo | undefined> {
    return this.findById(id).then((todo?) => {
      if (todo) {
        return this.repository.remove(todo);
      }
      return Promise.resolve<undefined>(undefined);
    });
  }

  async create(params: Partial<Todo> = {}): Promise<Todo | undefined> {
    const todo = new Todo(
      params.description || "",
      new Date(),
      new Date(),
      undefined,
      params.more_description
    );

    return this.repository.save(todo);
  }
}
