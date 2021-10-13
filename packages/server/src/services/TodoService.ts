import { Connection, Repository } from "typeorm";
import { Todo } from "../entity/Todo";

export class TodoService {
    private repository: Repository<Todo>

    constructor(connection: Connection){
        this.repository = connection.getRepository(Todo);
    }

    async save(todo: Todo): Promise<void> {
        await this.repository.save(todo);
    }

    async list(): Promise<any> {
        return this.repository.find()
    }
}
