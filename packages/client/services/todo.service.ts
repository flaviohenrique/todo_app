import { ITodo } from './../interfaces/index';

export class TodoService {
  async getAllTodos(): Promise<ITodo[]> {
    const res = await fetch(`${process.env.HOST}/todos`)

    return await res.json()
  }
}
