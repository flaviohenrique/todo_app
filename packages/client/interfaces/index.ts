export interface ITodo {
  id: string;
  description: string;
  moreDescription?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoggedUser {
  id: string
}
