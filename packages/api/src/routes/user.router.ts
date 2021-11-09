import { CreateUserController } from "../modules/users/create-user/create-user.http.controller";
import express, { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { UserController } from "../controllers/UserController";
import { LoginController } from "../modules/users/login/login.http.controller";

@Service()
export class UserRouter {
  constructor(
    private readonly userController: UserController,
    private readonly createUserController: CreateUserController,
    private readonly loginController: LoginController
  ) {}

  register(app: express.Application) {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      this.userController.checkUserToken(req, res, next);
    });

    app.post("/users", (req, res) => {
      this.createUserController.create(req, res);
    });

    app.post("/users/login", (req, res) => {
      this.loginController.login(req, res);
    });
  }
}
