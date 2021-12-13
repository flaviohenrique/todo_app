import { v4 as uuidv4 } from "uuid";
import { TodoStatus } from "../../entities/todo.orm.entity";
import { AggregateRoot } from "../../shared/aggregate-root";
import type { ICreateTodo, ITodoProps, IUpdateDescription } from "./types";

export class TodoEntity extends AggregateRoot<ITodoProps> {
  get status(): string {
    return this.props.status;
  }

  get description(): string {
    return this.props.description;
  }
  get moreDescription(): string | undefined {
    return this.props.moreDescription;
  }
  get userId(): string {
    return this.props.userId;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  belongsTo(userId: string): boolean {
    return this.props.userId === userId;
  }
  static create(create: ICreateTodo): TodoEntity {
    const id = uuidv4();

    const props: ITodoProps = {
      createdAt: new Date(),
      updatedAt: new Date(),
      ...create,
      status: TodoStatus.ACTIVE,
    };

    return new TodoEntity(props, id);
  }

  updateDescriptions(props: IUpdateDescription): void {
    this.props.moreDescription = props.moreDescription;
    this.props.description = props.description || "";
    this.props.updatedAt = new Date();
  }
}
