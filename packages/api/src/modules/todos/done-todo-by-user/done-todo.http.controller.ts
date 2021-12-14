import { DontBelongsToUserError, TodoNotFoundError } from "./../errors";
import { Request, Response } from "express";
import { Service } from "typedi";
import { TodoMapper } from "../mapper";
import { DoneTodoByUserService } from "./done-todo.service";

@Service()
export class DoneTodoByUserController {
  constructor(private readonly doneTodoByUserService: DoneTodoByUserService) {}

  async update(req: Request, res: Response): Promise<void> {
    const todoId = req.params.id;
    const userId = req.query.userId;

    const result = await this.doneTodoByUserService.execute({
      id: todoId,
      userId: userId?.toString() || "",
    });

    result.unwrap(
      (todo) => res.status(200).json(TodoMapper.toDTO(todo)),
      (error) => {
        switch (error.constructor) {
          case DontBelongsToUserError:
            res.status(403).json(error);
            break;
          case TodoNotFoundError:
            res.status(404).json(error);
            break;
          default:
            throw error;
        }
      }
    );
  }
}
