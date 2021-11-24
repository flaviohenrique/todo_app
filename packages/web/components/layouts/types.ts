export type LayoutComponentProps = {
  children: React.ReactNode;
};

export type LayoutComponentType = ({
  ...args
}: LayoutComponentProps) => JSX.Element;
