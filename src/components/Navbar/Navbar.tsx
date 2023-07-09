import { auth } from "@/firebase/clientApp";
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsSoundwave } from "react-icons/bs";
import Authentication from "./Authentication";
import SearchInput from "./SearchInput";

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <Flex
      bg="blue.900"
      py={2}
      px={48}
      minWidth="max-content"
      alignItems="center"
      gap={4}
    >
      <Link as={NextLink} href="/" mr={6}>
        <Flex mr={4} direction="row" alignItems="center">
          <Icon as={BsSoundwave} boxSize="30px" color="pink.200" mr={2} />
          <Heading size="md" color="pink.200" textTransform="uppercase">
            Tracklister
          </Heading>
        </Flex>
      </Link>
      <SearchInput
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
      />
      {searchFocused && (
        <CloseButton
          color="whiteAlpha.900"
          onClick={() => setSearchFocused(false)}
        />
      )}
      <Spacer />
      <Box display={searchFocused ? "none" : "flex"} alignItems="center">
        <Box mr={{ base: 0, md: 10 }}>
          <Link as={NextLink} color="whiteAlpha.900" href="/discover" mr={6}>
            Categories
          </Link>
          <Link as={NextLink} color="whiteAlpha.900" href="/upload">
            Upload
          </Link>
        </Box>
        <Authentication user={user} />
      </Box>
    </Flex>
  );
};

export default Navbar;
