import express from "express";
import { Service } from "typedi";
import { UserRouter } from "./user.router";
import { TodoRouter } from "./todo.router";

@Service()
export class Router {
  constructor(
    private readonly userRouter: UserRouter,
    private readonly todoRouter: TodoRouter
  ) {}

  register(app: express.Application) {
    this.userRouter.register(app);
    this.todoRouter.register(app);
  }
}
