import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Avatar,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { VFC } from "react";

type ProfileMenuProps = {
  name?: string;
  avatarImgUrl: string;
  links: JSX.Element[];
};

export const ProfileMenu: VFC<ProfileMenuProps> = ({
  name,
  avatarImgUrl,
  links,
}) => {
  return (
    <Menu>
      <MenuButton variant={"solid"}>
        <HStack>
          <Text>Olá {name}</Text>
          <Avatar bg="teal.500" src={avatarImgUrl} />
        </HStack>
      </MenuButton>
      <MenuList>
        {links.map((link, key) => {
          return <MenuItem key={key}>{link}</MenuItem>;
        })}
      </MenuList>
    </Menu>
  );
};
