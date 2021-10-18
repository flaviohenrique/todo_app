import { UserService } from "../services/UserService";
import { Connection } from "typeorm";
import { Request, Response, NextFunction } from "express";

export class UserController {
  private readonly userService: UserService;

  constructor(private connection: Connection) {
    this.userService = new UserService(connection);
  }

  async checkUserToken(req: Request, res: Response, next: NextFunction) {
    if (req.headers["token"]) {
      const user = await this.userService.findById(
        Number(req.headers["token"])
      );

      if (user) {
        res.locals.user = user;
      } else {
        res.status(403);
      }
    }
    next();
  }
}
