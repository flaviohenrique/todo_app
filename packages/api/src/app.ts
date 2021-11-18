import "reflect-metadata";

import { TodoEventHandlers } from "./modules/todos/event.handlers";

import express from "express";
import { useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { withConnection } from "./infrastructure/database";
import { Router } from "./routes";

useContainer(Container);

const app = express();
app.use(express.json());

withConnection().then(
  async (_connection) => {
    const routes = Container.get<Router>(Router);
    const todoEventHandlers =
      Container.get<TodoEventHandlers>(TodoEventHandlers);

    todoEventHandlers.init();

    routes.register(app);
  },
  (error) => console.log(error),
);

console.log("process.env.PORT", process.env.PORT);

app.listen(process.env.PORT || 3000);
