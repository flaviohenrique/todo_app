import { UpdateTodoByUserController } from "./../modules/todos/update-todo-by-user/update-todo.http.controller";
import { CreateTodoByUserController } from "./../modules/todos/create-todo-by-user/create-todo.http.controller";
import { ListTodoController } from "../modules/todos/list-by-user/list.http.controller";
import express, { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class TodoRouter {
  constructor(
    private readonly listTodosController: ListTodoController,
    private readonly createTodoByUserController: CreateTodoByUserController,
    private readonly updateTodoByUserController: UpdateTodoByUserController
  ) {}

  register(app: express.Application): void {
    app.get("/todos", (req: Request, res: Response) => {
      this.listTodosController.list(req, res);
    });

    app.post("/todos", (req: Request, res: Response) => {
      this.createTodoByUserController.create(req, res);
    });

    app.put("/todos/:id", (req: Request, res: Response) => {
      this.updateTodoByUserController.update(req, res);
    });
  }
}
