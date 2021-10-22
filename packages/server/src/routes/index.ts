import { UpdateTodoByUserController } from './../modules/todos/update-todo-by-user/update-todo.http.controller';
import { CreateTodoByUserController } from './../modules/todos/create-todo-by-user/create-todo.http.controller';
import { ListTodoController } from "./../modules/todos/list/list.http.controller";
import { CreateUserController } from "./../modules/users/create-user/create-user.http.controller";
import express, { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { UserController } from "../controllers/UserController";

@Service()
export class Router {
  constructor(
    private readonly userController: UserController,
    private readonly createUserController: CreateUserController,
    private readonly listTodosController: ListTodoController,
    private readonly createTodoByUserController: CreateTodoByUserController,
    private readonly updateTodoByUserController: UpdateTodoByUserController,
  ) { }

  register(app: express.Application) {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      this.userController.checkUserToken(req, res, next);
    });

    app.get("/todos/", (req: Request, res: Response) => {
      this.listTodosController.list(req, res);
    });

    app.post("/todos", (req: Request, res: Response) => {
      this.createTodoByUserController.create(req, res);
    });

    app.put("/todos/:id", (req: Request, res: Response) => {
      this.updateTodoByUserController.update(req, res);
    });

    // app.get("/todos/:id", (req: Request, res: Response) => {
    //   this.todoController.getTodo(req, res);
    // });

    // app.delete("/todos/:id", (req: Request, res: Response) => {
    //   this.todoController.deleteTodo(req, res);
    // });

    app.post("/users", (req, res) => {
      this.createUserController.create(req, res);
    });
  }
}
