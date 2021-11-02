import { Request, Response } from "express";
import { Service } from "typedi";
import { UserAlreadyExistsError } from "../errors";
import { CreateUserService } from "./create-user.service";

@Service()
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) { }

  async create(req: Request, res: Response) {
    const result = await this.createUserService.execute(req.body);

    result.unwrap(
      (user) => {
        res.status(200).json(user);
      },
      (error) => {
        if (error instanceof UserAlreadyExistsError) {
          res.status(409).json(error.toJSON(true));
        } else {
          throw error;
        }
      }
    );
  }
}
