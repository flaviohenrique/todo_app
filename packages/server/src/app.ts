import "reflect-metadata";

import express from "express";
import { useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { withConnection } from "./infrastructure/database";
import { Router } from "./routes";


useContainer(Container)

const app = express();
app.use(express.json());

withConnection().then(async (_connection) => {
  const routes = Container.get<Router>(Router)

  routes.register(app)
}, (error) => console.log(error));

app.listen(3000)
