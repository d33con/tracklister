import { auth } from "@/firebase/clientApp";
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Authentication from "./Authentication";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      bg="blue.900"
      pt={2}
      pb={2}
      pl={10}
      pr={10}
      minWidth="max-content"
      alignItems="center"
      gap={4}
    >
      <Box mr={4}>
        <Heading size="md" color="pink.200" textTransform="uppercase">
          Tracklister
        </Heading>
      </Box>
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
          <Link as={NextLink} color="whiteAlpha.900" href="#" mr={6}>
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
