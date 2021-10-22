import { InjectRepository } from 'typeorm-typedi-extensions';
import { TodoEntity } from './../modules/todos/todo';
import { Service } from "typedi";
import { Repository } from "typeorm";
import { Todo } from "../entities/todo";

@Service()
export class TodoRepository {
  constructor(
    @InjectRepository(Todo) private repository: Repository<Todo>,
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



// import { Service } from "typedi";
// import { EntityRepository, Repository } from "typeorm";
// import { User } from "../entities/user";

// @Service()
// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//   async findByEmail(email: string): Promise<User | undefined> {
//     return await this.findOne({ email });
//   }

//   async exists(email: string): Promise<boolean> {
//     const found = await this.findByEmail(email);
//     return found ? true : false;
//   }
// }
