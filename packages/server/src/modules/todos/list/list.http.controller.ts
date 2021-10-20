import { Request, Response } from "express";
import { Service } from "typedi";
import { ListTodoService } from "./list.service";

@Service()
export class ListTodoController {
  constructor(private readonly listTodoService: ListTodoService) {}

  async list(req: Request, res: Response) {
    const result = await this.listTodoService.execute();

    result.unwrap(
      (todos) => {
        res.status(200).json(todos);
      },
      (error) => {
        throw error;
      }
    );
  }
}
