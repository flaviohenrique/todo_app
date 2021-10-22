import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Todo } from "../entities/todo";
import { TodoRepository } from "../repositories/TodoRepository";

@Service()
export class TodoService {
  constructor(
    private repository: TodoRepository
  ) { }

  // async save(todo: Todo): Promise<void> {
  //   await this.repository.save(todo);
  // }

  // async findById(id: number): Promise<Todo | undefined> {
  //   return this.repository.findOne(id);
  // }

  // async update(
  //   id: number,
  //   params: Partial<Todo> = {}
  // ): Promise<Todo | undefined> {
  //   return this.findById(id).then((todo) => {
  //     if (todo) {
  //       todo.moreDescription = params.moreDescription;
  //       todo.description = params.description || "";
  //       todo.updatedAt = new Date();

  //       return this.repository.save(todo);
  //     }
  //   });
  // }

  // async delete(id: number): Promise<Todo | undefined> {
  //   return this.findById(id).then((todo?) => {
  //     if (todo) {
  //       return this.repository.remove(todo);
  //     }
  //     return Promise.resolve<undefined>(undefined);
  //   });
  // }

  // async create(
  //   user: User,
  //   params: Partial<Todo> = {}
  // ): Promise<Todo | undefined> {
  //   const todo = new Todo(
  //     params.description || "",
  //     new Date(),
  //     new Date(),
  //     undefined,
  //     params.more_description
  //   );
  //   todo.user = user;

  //   return this.repository.save(todo);
  // }
}
