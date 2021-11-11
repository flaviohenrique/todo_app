import { IUser } from "../../interfaces";

export type LayoutComponentProps = {
  children: React.ReactNode;
  user?: IUser;
};

export type LayoutComponentType = ({
  ...args
}: LayoutComponentProps) => JSX.Element;
