import { TodoService } from "../services/TodoService";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { Service } from "typedi";

@Service()
export class TodoController {
  constructor(private readonly todoService: TodoService) { }


  getAllTodos(req: Request, res: Response) {
    this.todoService.list().then((todos) => res.json(todos));
  }

  createTodo(req: Request, res: Response) {
    const user = <User>res.locals.user;

    this.todoService.create(user, req.body).then((todo) => res.json(todo));
  }

  updateTodo(req: Request, res: Response) {
    this.todoService
      .update(Number(req.params.id), req.body)
      .then((todo) => res.json(todo));
  }

  getTodo(req: Request, res: Response) {
    this.todoService
      .findById(Number(req.params.id))
      .then((todo) => res.json(todo));
  }

  deleteTodo(req: Request, res: Response) {
    this.todoService.delete(Number(req.params.id)).then((todo?) => {
      if (todo) {
        res.status(204).json(todo);
      } else {
        res.status(404).json();
      }
    });
  }
}
