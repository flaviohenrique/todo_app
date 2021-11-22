import { Request, Response } from "express";
import { Service } from "typedi";
import { CreateTodoByUserService } from "./create-todo.service";

@Service()
export class CreateTodoByUserController {
  constructor(
    private readonly createTodoByUserService: CreateTodoByUserService
  ) {}

  async create(req: Request, res: Response) {
    const result = await this.createTodoByUserService.execute(req.body);

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
