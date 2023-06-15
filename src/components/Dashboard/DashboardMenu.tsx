import { loggedInUserState } from "@/atoms/userAtom";
import { auth } from "@/firebase/clientApp";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { BsPersonLinesFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { useRecoilValue } from "recoil";

type DashboardMenuProps = {};

const DashboardMenu: React.FC<DashboardMenuProps> = () => {
  const [hovered, setHovered] = useState(false);
  const [user] = useAuthState(auth);
  const currentUser = useRecoilValue(loggedInUserState);

  return (
    <Box width="15%" p={8}>
      <VStack spacing={4} align="stretch">
        <LinkBox
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <HStack spacing={1}>
            {user?.photoURL ? (
              <Avatar src={user.photoURL} size="md" />
            ) : (
              <Icon as={HiUserCircle} boxSize={12} />
            )}
            <LinkOverlay as={NextLink} href="#" />
            <Box>
              <Text ml={-1} fontSize={18} color="blackAlpha.900">
                {currentUser.user?.creatorName ||
                  user?.displayName ||
                  user?.email}
              </Text>
              <Text
                mt={-1}
                ml={-1}
                fontSize={14}
                color={hovered ? "blackAlpha.800" : "blackAlpha.600"}
              >
                View Profile
              </Text>
            </Box>
          </HStack>
        </LinkBox>
        <Divider />
        <Link
          as={NextLink}
          color="blackAlpha.700"
          _hover={{ color: "blackAlpha.900 " }}
          href="/dashboard/my-dashboard"
          textAlign="left"
          textTransform="uppercase"
        >
          <Icon
            as={MdOutlineDashboard}
            boxSize={6}
            mr={4}
            verticalAlign="bottom"
          />
          Dashboard
        </Link>
        <Link
          as={NextLink}
          color="blackAlpha.700"
          _hover={{ color: "blackAlpha.900 " }}
          href="/dashboard/my-shows"
          textAlign="left"
          textTransform="uppercase"
        >
          <Icon
            as={BsPersonLinesFill}
            boxSize={6}
            mr={4}
            verticalAlign="bottom"
          />
          My shows
        </Link>
        <Divider />
        <Link
          as={NextLink}
          color="blackAlpha.700"
          _hover={{ color: "blackAlpha.900 " }}
          href="/dashboard/new-uploads"
          textAlign="left"
          textTransform="uppercase"
        >
          <Icon
            as={AiOutlinePlaySquare}
            boxSize={6}
            mr={4}
            verticalAlign="bottom"
          />
          New shows
        </Link>
      </VStack>
    </Box>
  );
};

export default DashboardMenu;
