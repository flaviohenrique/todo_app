import React, { VFC } from "react";
import { Spinner } from "@chakra-ui/react";

type LoadingProps = {
  isLoading: boolean;
};

export const Loading: VFC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <Spinner
      label="loading"
      color="teal.500"
      m="5"
      thickness="3px"
      size="lg"
      emptyColor="gray.200"
      speed="0.65s"
      alignSelf="center"
    />
  );
};
