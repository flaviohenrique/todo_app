import { TodoController } from "./controllers/TodoController";
import { UserController } from "./controllers/UserController";

import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";

import { getConnection } from "./infrastructure/db";

const app = express();

app.use(express.json());

getConnection()
  .then(createConnection)
  .then(async (connection) => {
    const todoController = new TodoController(connection);
    const userController = new UserController(connection);

    app.use(async function (req: Request, res: Response, next: NextFunction) {
      userController.checkUserToken(req, res, next);
    });

    app.get("/todos/", (req: Request, res: Response) => {
      todoController.getAllTodos(req, res);
    });

    app.post("/todos", (req: Request, res: Response) => {
      todoController.createTodo(req, res);
    });

    app.put("/todos/:id", (req: Request, res: Response) => {
      todoController.updateTodo(req, res);
    });

    app.get("/todos/:id", (req: Request, res: Response) => {
      todoController.getTodo(req, res);
    });

    app.delete("/todos/:id", (req: Request, res: Response) => {
      todoController.deleteTodo(req, res);
    });
  })
  .catch((error) => console.log(error));

app.listen(3000);
