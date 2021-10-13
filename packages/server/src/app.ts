import "reflect-metadata";

import express, { Request, Response } from "express";
import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { join } from "path";
import { readJson } from "fs-extra";
import { TodoService } from "./services/TodoService";

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
    // console.log("Inserting a new todo into the database...");
    // const todo = new Todo("Todo", new Date(), new Date(), undefined, "More Todo");

    // const todoService = new TodoService(connection)

    // //todoService.save(todo)

    // console.log("Finishing a new todo into the database...");

    app.get("/todos/", (req: Request, res: Response) => {
      const todoService = new TodoService(connection);
      todoService.list().then((todos) => res.json(todos));
    });

    app.post("/todos", (req: Request, res: Response) => {
      const todoService = new TodoService(connection);
      todoService.create(req.body).then((todo) => res.json(todo));
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
