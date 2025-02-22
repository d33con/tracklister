import { currentUserState } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import {
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSignOut } from "react-firebase-hooks/auth";

const UserMenu = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const currentUser = useAtomValue(currentUserState);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
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
            src={currentUser?.photoURL || "/headshot.png"}
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
            href={`/${currentUser?.creatorSlug}`}
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
