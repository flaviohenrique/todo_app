import { Request, Response } from "express";
import { Service } from "typedi";
import { CreateTodoByUserService } from "./create-todo.service";
import { User } from "../../../entities/user.orm.entity";

@Service()
export class CreateTodoByUserController {
  constructor(
    private readonly createTodoByUserService: CreateTodoByUserService
  ) {}

  async create(req: Request, res: Response) {
    const user = <User>res.locals.user;

    const result = await this.createTodoByUserService.execute({
      userId: user.id,
      ...req.body,
    });

    result.unwrap(
      (todo) => {
        res.status(200).json(todo);
      },
      (error) => {
        throw error;
      }
    );
  }
}
