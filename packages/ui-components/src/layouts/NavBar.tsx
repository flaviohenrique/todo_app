import React, { PropsWithChildren, VFC } from "react";

import { Box, Flex } from "@chakra-ui/react";


export const NavBar: VFC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box borderWidth={1} bg={"gray.100"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>My Todo App</Box>
        {children}
      </Flex>
    </Box>
  );
}
