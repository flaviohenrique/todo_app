import { CreateTodoByUserController } from './../modules/todos/create-todo-by-user/create-todo.http.controller';
import { ListTodoController } from "./../modules/todos/list/list.http.controller";
import { CreateUserController } from "./../modules/users/create-user/create-user.http.controller";
import express, { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { TodoController } from "../controllers/TodoController";
import { UserController } from "../controllers/UserController";

@Service()
export class Router {
  constructor(
    private readonly todoController: TodoController,
    private readonly userController: UserController,
    private readonly createUserController: CreateUserController,
    private readonly listTodosController: ListTodoController,
    private readonly CreateTodoByUserController: CreateTodoByUserController
  ) { }

  register(app: express.Application) {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      this.userController.checkUserToken(req, res, next);
    });

    app.get("/todos/", (req: Request, res: Response) => {
      this.listTodosController.list(req, res);
    });

    app.post("/todos", (req: Request, res: Response) => {
      this.CreateTodoByUserController.create(req, res);
    });

    // app.put("/todos/:id", (req: Request, res: Response) => {
    //   this.todoController.updateTodo(req, res);
    // });

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
