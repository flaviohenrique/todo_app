import { Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import React, { VFC } from "react";

type ProfileMenuProps = {
  name?: string;
};

const ProfileMenu: VFC<ProfileMenuProps> = ({ name }) => {
  return (
    <Menu>
      <MenuButton variant={"solid"}>Olá {name}</MenuButton>
      <MenuList>
        <MenuItem>
          <a href={`/api/auth/logout`}>Logout</a>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
