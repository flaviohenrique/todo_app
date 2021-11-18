import { CreateUserController } from "../modules/users/create-user/create-user.http.controller";
import express from "express";
import { Service } from "typedi";
import { LoginController } from "../modules/users/login/login.http.controller";

@Service()
export class UserRouter {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly loginController: LoginController
  ) {}

  register(app: express.Application) {
    app.post("/users", (req, res) => {
      this.createUserController.create(req, res);
    });

    app.post("/users/login", (req, res) => {
      this.loginController.login(req, res);
    });
  }
}
