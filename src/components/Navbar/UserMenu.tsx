import { auth } from "@/firebase/clientApp";
import {
  Avatar,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";

type UserMenuProps = {};

const UserMenu: React.FC<UserMenuProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        aria-label="User menu"
        cursor="pointer"
        icon={
          <Avatar
            size="md"
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          />
        }
      />
      <MenuList textAlign="center">
        <MenuItem>
          <Link
            as={NextLink}
            color="blackAlpha.900"
            href="/dashboard/my-dashboard"
            textAlign="center"
          >
            My dashboard
          </Link>
        </MenuItem>
        <MenuItem>
          <Link color="blackAlpha.900" onClick={handleSignOut}>
            Log Out
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
