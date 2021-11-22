import React from "react";

import type { AuthPageProps } from "shared";
import { Box, Flex } from "@chakra-ui/react";
import { ProfileMenu } from "./ProfileMenu";

export const NavBar = (props: AuthPageProps) => {
  return (
    <Box borderWidth={1} bg={"gray.100"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>My Todo App</Box>
        <ProfileMenu name={props.user?.name} />
      </Flex>
    </Box>
  );
};
