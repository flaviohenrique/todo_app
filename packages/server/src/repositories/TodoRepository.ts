import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { Todo } from "../entities/todo";

@Service()
@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {}
