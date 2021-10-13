import "reflect-metadata";

import express from "express";
import {createConnection, ConnectionOptions, Connection} from "typeorm";
import { Todo } from "./entity/Todo";
import { join } from 'path';
import { readJson } from 'fs-extra';
import { TodoService } from "./services/TodoService";

export const getConnection = async (): Promise<ConnectionOptions> => {
    const config: ConnectionOptions =  await readJson(join(process.cwd(), '/ormconfig.json'));

    if(!config) {
      throw Error('Connection Not Found');
    }
    return Promise.resolve<ConnectionOptions>(config);
  }
  

const app = express();

getConnection().then(createConnection).then(async connection => {
  // console.log("Inserting a new todo into the database...");
  // const todo = new Todo("Todo", new Date(), new Date(), undefined, "More Todo");

  // const todoService = new TodoService(connection)
    
  // //todoService.save(todo)

  // console.log("Finishing a new todo into the database...");

  app.get('/', (req, res) => {
    const todoService = new TodoService(connection)
    todoService.list().then(todos => res.json(todos))
  })
}).catch(error => console.log(error));



app.listen(3000)
