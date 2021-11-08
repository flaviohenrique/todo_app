export interface ITodo {
  id: string;
  description: string;
  moreDescription?: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoggedUser {
  id: string
}
