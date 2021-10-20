import { UserService } from "../services/UserService";
import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";

@Service()
export class UserController {
  constructor(private readonly userService: UserService) { }

  async checkUserToken(req: Request, res: Response, next: NextFunction) {
    if (req.headers["token"]) {
      const user = await this.userService.findById(String(req.headers["token"]));

      if (user) {
        console.log(user)
        res.locals.user = user;
      } else {
        res.status(403);
      }
    }
    next();
  }
}
