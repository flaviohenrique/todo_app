import { Request, Response } from "express";
import { Service } from "typedi";
import { UserAlreadyExistsError } from "../errors";
import { CreateUserService } from "./create-user.service";
import { UserMapper } from "../mapper";

@Service()
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  async create(req: Request, res: Response): Promise<void> {
    const result = await this.createUserService.execute(req.body);

    result.unwrap(
      (user) => {
        res.status(200).json(UserMapper.toDTO(user));
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
