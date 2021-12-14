declare module "shared" {
  export type TodoStatus = "active" | "deleted" | "done" | "archived";

  export interface ICreateTodo {
    description: string;
    moreDescription?: string;
  }

  export interface ITodo extends ICreateTodo {
    id: string;
    status: TodoStatus;
  }
  export interface IDoneTodo {
    id: string;
    userId: string;
  }

  export interface IUser {
    id: string;
    email: string;
    name: string;
  }

  export interface ISession extends IUser {
    createdAt: number;
    maxAge: number;
  }

  export interface ICreateUser {
    name: string;
    email: string;
    password: string;
  }

  export interface IUserCredentials {
    email: string;
    password: string;
  }

  export interface IAddedAvatar {
    id: string;
    name: string;
    mimetype: string;
  }

  export type AuthPageProps = { user?: IUser };
}

export type LoadingState = {
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
};
