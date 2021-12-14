import type { TodoDTO } from "./types";
import { Todo, TodoStatus } from "../../entities/todo.orm.entity";
import { TodoEntity } from "./todo";

export class TodoMapper {
  static toDomain(t: Todo): TodoEntity {
    const { id: id, ...props } = t;

    return new TodoEntity(props, id);
  }

  static toPersistence(entity: TodoEntity): Partial<Todo> {
    const { status: status, ...props } = entity.props;

    return {
      id: entity.id,
      status: <TodoStatus>status,
      ...props,
    };
  }

  static toDTO(todo: TodoEntity): TodoDTO {
    return {
      id: todo.id,
      description: todo.description,
      status: todo.status,
      userId: todo.userId,
    };
  }
}
