import { DontBelongsToUserError, TodoNotFoundError } from "./../errors";
import { Request, Response } from "express";
import { Service } from "typedi";
import { UpdateTodoByUserService } from "./update-todo.service";
import { User } from "../../../entities/user.orm.entity";
import { TodoMapper } from "../mapper";

@Service()
export class UpdateTodoByUserController {
  constructor(
    private readonly updateTodoByUserService: UpdateTodoByUserService
  ) {}

  async update(req: Request, res: Response): Promise<void> {
    const todoId = req.params.id;

    const result = await this.updateTodoByUserService.execute({
      id: todoId,
      ...req.body,
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
