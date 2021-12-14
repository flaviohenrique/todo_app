import { Request, Response } from "express";
import { Service } from "typedi";
import { UserNotFoundError } from "../errors";
import { UserMapper } from "../mapper";
import { LoginService } from "./login.service";

@Service()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async login(req: Request, res: Response): Promise<void> {
    const result = await this.loginService.execute(req.body);

    result.unwrap(
      (user) => {
        res.status(200).json(UserMapper.toDTO(user));
      },
      (error) => {
        if (error instanceof UserNotFoundError) {
          res.status(401).json(error.toJSON(true));
        } else {
          throw error;
        }
      }
    );
  }
}
