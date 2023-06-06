import {
  Avatar,
  Box,
  Divider,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";

type DashboardMenuProps = {};

const DashboardMenu: React.FC<DashboardMenuProps> = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box width="15%" p={6}>
      <VStack spacing={4} align="stretch">
        <LinkBox
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <HStack spacing={1}>
            <Avatar
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              size="md"
            />
            <LinkOverlay as={NextLink} href="#" />
            <Box>
              <Text fontSize={20} color="blackAlpha.900">
                Matthew
              </Text>
              <Text
                mt={-2}
                fontSize={14}
                color={hovered ? "blackAlpha.800" : "blackAlpha.600"}
              >
                View Profile
              </Text>
            </Box>
          </HStack>
        </LinkBox>
        <Link
          as={NextLink}
          color="blackAlpha.900"
          href="/dashboard/my-dashboard"
          textAlign="center"
        >
          My dashboard
        </Link>
        <Link
          as={NextLink}
          color="blackAlpha.900"
          href="/dashboard/my-shows"
          textAlign="center"
        >
          My shows
        </Link>
        <Divider />
        <Link
          as={NextLink}
          color="blackAlpha.900"
          href="/dashboard/new-uploads"
          textAlign="center"
        >
          New shows
        </Link>
      </VStack>
    </Box>
  );
};

export default DashboardMenu;
