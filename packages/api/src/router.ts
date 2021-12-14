import express from "express";
import { Service } from "typedi";
import { UserRouter } from "./modules/users/infra/http";
import { TodoRouter } from "./modules/todos/infra/http";

@Service()
export class Router {
  constructor(
    private readonly userRouter: UserRouter,
    private readonly todoRouter: TodoRouter
  ) {}

  register(app: express.Application): void {
    this.userRouter.register(app);
    this.todoRouter.register(app);
  }
}
