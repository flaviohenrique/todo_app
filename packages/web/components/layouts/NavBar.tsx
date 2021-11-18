import { AuthPageProps } from "../../interfaces";
import { Box, Flex } from "@chakra-ui/react";
import ProfileMenu from "../layouts/ProfileMenu";

const NavBar = (props: AuthPageProps) => {
  return (
    <Box borderWidth={1} bg={"gray.100"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>My Todo App</Box>
        <ProfileMenu name={props.user?.name} />
      </Flex>
    </Box>
  );
};

export default NavBar;
