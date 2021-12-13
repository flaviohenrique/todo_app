import { Request, Response } from "express";
import { Service } from "typedi";
import { TodoMapper } from "../mapper";
import { CreateTodoByUserService } from "./create-todo.service";

@Service()
export class CreateTodoByUserController {
  constructor(
    private readonly createTodoByUserService: CreateTodoByUserService
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const result = await this.createTodoByUserService.execute(req.body);

    result.unwrap(
      (todo) => {
        res.status(200).json(TodoMapper.toDTO(todo));
      },
      (error) => {
        throw error;
      }
    );
  }
}
