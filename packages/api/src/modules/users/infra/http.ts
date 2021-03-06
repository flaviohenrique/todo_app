import { GetAvatarFileController } from "../get-avatar-file/get-avatar-file.http.controller";
import {
  AddAvatarController,
  uploadConfig,
} from "../add-avatar/add-avatar.http.controller";
import { CreateUserController } from "../create-user/create-user.http.controller";
import express from "express";
import { Service } from "typedi";
import { LoginController } from "../login/login.http.controller";

@Service()
export class UserRouter {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly loginController: LoginController,
    private readonly addAvatarController: AddAvatarController,
    private readonly getAvatarFileController: GetAvatarFileController
  ) {}

  register(app: express.Application): void {
    app.post("/users", (req, res) => {
      this.createUserController.create(req, res);
    });

    app.post("/users/login", (req, res) => {
      this.loginController.login(req, res);
    });

    app.put("/users/:userId/avatar", uploadConfig, (req, res) => {
      this.addAvatarController.addAvatar(req, res);
    });

    app.get("/users/:userId/avatar", (req, res) => {
      this.getAvatarFileController.getAvatarFile(req, res);
    });
  }
}
