import * as React from "react";
import Title from "./Title/Title";

interface Props {
  text: string;
}

const ExampleComponent = ({ text }: Props) => {
  return <div>Example Component: {text}</div>;
};

export * from "./layouts";

export { Title, ExampleComponent };
