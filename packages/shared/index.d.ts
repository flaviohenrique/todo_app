declare module "shared" {
  export interface ITodo {
    id: string;
    description: string;
    moreDescription?: string;
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

  export type AuthPageProps = { user?: IUser };
}
