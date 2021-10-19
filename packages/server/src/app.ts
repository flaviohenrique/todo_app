import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

import { getConnection } from "./infrastructure/db";
import { Router } from "./routes";


useContainer(Container)

const app = express();

app.use(express.json());


getConnection()
  .then(createConnection)
  .then(async (_connection) => {
    const routes = Container.get<Router>(Router)

    routes.register(app)
  })
  .catch((error) => console.log(error));

app.listen(3000);
