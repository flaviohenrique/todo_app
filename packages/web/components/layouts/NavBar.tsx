import { AuthPageProps } from "../../interfaces";
import { Box, Flex } from "@chakra-ui/layout";
import { Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/menu";

const NavBar = (props: AuthPageProps) => {
  return (
    <Box borderWidth={1} bg={"gray.100"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>My Todo App</Box>
        <Menu>
          <MenuButton variant={"solid"}>Olá {props.user?.name}</MenuButton>
          <MenuList>
            <MenuItem>
              <a href={`/api/auth/logout`}>Logout</a>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default NavBar;
