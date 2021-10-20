import { Request, Response } from "express";
import { Service } from "typedi";
import { UserNotFoundError } from "../errors";
import { CreateTodoByUserService } from "./create-todo.service";
import { User } from "../../../entities/user"

@Service()
export class CreateTodoByUserController {
  constructor(private readonly createTodoByUserService: CreateTodoByUserService) { }

  async create(req: Request, res: Response) {
    const user = <User>res.locals.user;

    const result = await this.createTodoByUserService.execute({ userId: user.id, ...req.body });

    result.unwrap(
      (todo) => {
        res.status(200).json(todo);
      },
      (error) => {
        if (error instanceof UserNotFoundError) {
          res.status(404).json(error.toJSON(true));
        } else {
          throw error;
        }
      }
    );
  }
}
