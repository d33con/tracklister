import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import NextLink from "next/link";

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
        <Divider />
        <Box h="40px" bg="tomato">
          2
        </Box>
        <Box h="40px" bg="pink.100">
          3
        </Box>
      </VStack>
    </Box>
  );
};

export default DashboardMenu;
