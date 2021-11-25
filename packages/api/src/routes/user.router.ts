import { AddAvatarController } from './../modules/users/add-avatar/add-avatar.http.controller';
import { CreateUserController } from "../modules/users/create-user/create-user.http.controller";
import express from "express";
import { Service } from "typedi";
import { LoginController } from "../modules/users/login/login.http.controller";

@Service()
export class UserRouter {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly loginController: LoginController,
    private readonly addAvatarController: AddAvatarController,
  ) {}

  register(app: express.Application) {
    app.post("/users", (req, res) => {
      this.createUserController.create(req, res);
    });

    app.post("/users/login", (req, res) => {
      this.loginController.login(req, res);
    });

    app.put('/users/:userId/avatar', this.addAvatarController.uploadConfig(), (req, res) => {
      this.addAvatarController.addAvatar(req, res)
    })
  }
}
