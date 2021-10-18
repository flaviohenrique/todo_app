import { User } from "./entity/User";
import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import { createConnection, ConnectionOptions } from "typeorm";
import { join } from "path";
import { readJson } from "fs-extra";
import { TodoService } from "./services/TodoService";
import { UserService } from "./services/UserService";

export const getConnection = async (): Promise<ConnectionOptions> => {
  const config: ConnectionOptions = await readJson(
    join(process.cwd(), "/ormconfig.json")
  );

  if (!config) {
    throw Error("Connection Not Found");
  }
  return Promise.resolve<ConnectionOptions>(config);
};

const app = express();

app.use(express.json());

getConnection()
  .then(createConnection)
  .then(async (connection) => {
    app.use(async function (req: Request, res: Response, next: NextFunction) {
      if (req.headers["token"]) {
        const userService = new UserService(connection);

        let user = await userService.findById(Number(req.headers["token"]));

        if (user) {
          res.locals.user = user;
        } else {
          res.status(403).json({});
        }
      }

      next();
    });

    app.get("/todos/", (req: Request, res: Response) => {
      const todoService = new TodoService(connection);
      todoService.list().then((todos) => res.json(todos));
    });

    app.post("/todos", (req: Request, res: Response) => {
      const user = <User>res.locals.user

      const todoService = new TodoService(connection);
      todoService.create(user, req.body).then((todo) => res.json(todo));
    });

    app.put("/todos/:id", (req: Request, res: Response) => {
      const todoService = new TodoService(connection);
      todoService
        .update(Number(req.params.id), req.body)
        .then((todo) => res.json(todo));
    });

    app.get("/todos/:id", (req: Request, res: Response) => {
      const todoService = new TodoService(connection);
      todoService
        .findById(Number(req.params.id))
        .then((todo) => res.json(todo));
    });

    app.delete("/todos/:id", (req: Request, res: Response) => {
      const todoService = new TodoService(connection);
      todoService.delete(Number(req.params.id)).then((todo?) => {
        if (todo) {
          res.status(204);
          res.json(todo);
        } else {
          res.status(404);
          res.json({});
        }
      });
    });
  })
  .catch((error) => console.log(error));

app.listen(3000);
