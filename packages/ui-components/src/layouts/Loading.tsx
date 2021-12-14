import React, { VFC } from "react";
import { Spinner, SpinnerProps } from "@chakra-ui/react";

type LoadingProps = SpinnerProps & {
  isLoading: boolean;
};

export const Loading: VFC<LoadingProps> = ({
  isLoading,
  size = "lg",
  ...props
}) => {
  if (!isLoading) return null;
  return (
    <Spinner
      label="loading"
      color="teal.500"
      thickness="3px"
      size={size}
      emptyColor="gray.200"
      speed="0.65s"
      alignSelf="center"
      {...props}
    />
  );
};
