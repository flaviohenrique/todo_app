import { Request, Response } from "express";
import { Service } from "typedi";
import { ListTodoService } from "./list.service";
import { TodoMapper } from "../mapper";

@Service()
export class ListTodoController {
  constructor(private readonly listTodoService: ListTodoService) {}

  async list(req: Request, res: Response): Promise<void> {
    const userId = req.query.userId as string;
    const result = await this.listTodoService.execute(userId);

    result.unwrap(
      (todos) => {
        res.status(200).json(todos.map(TodoMapper.toDTO));
      },
      (error) => {
        throw error;
      }
    );
  }
}
