import { LoggedInUser } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useSignOut } from "react-firebase-hooks/auth";

type UserMenuProps = {
  user: LoggedInUser;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleSignOut = () => {
    signOut();
  };

  const avatarSize = "36px";

  return (
    <Menu>
      <MenuButton
        as={Avatar}
        aria-label="User menu"
        cursor="pointer"
        width={avatarSize}
        height={avatarSize}
        icon={
          <Avatar
            width={avatarSize}
            height={avatarSize}
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
          <Link
            as={NextLink}
            color="blackAlpha.900"
            href={`/${user.creatorSlug}`}
            textAlign="center"
          >
            My profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            as={NextLink}
            color="blackAlpha.900"
            href="/settings/profile"
            textAlign="center"
          >
            Settings
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
