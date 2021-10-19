import express, { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { TodoController } from "../controllers/TodoController";
import { UserController } from "../controllers/UserController";

@Service()
export class Router {
  constructor(
    private readonly todoController: TodoController,
    private readonly userController: UserController,
  ) {
  }

  register(app: express.Application) {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      this.userController.checkUserToken(req, res, next);
    });

    app.get("/todos/", (req: Request, res: Response) => {
      this.todoController.getAllTodos(req, res);
    });

    app.post("/todos", (req: Request, res: Response) => {
      this.todoController.createTodo(req, res);
    });

    app.put("/todos/:id", (req: Request, res: Response) => {
      this.todoController.updateTodo(req, res);
    });

    app.get("/todos/:id", (req: Request, res: Response) => {
      this.todoController.getTodo(req, res);
    });

    app.delete("/todos/:id", (req: Request, res: Response) => {
      this.todoController.deleteTodo(req, res);
    });
  }
}
