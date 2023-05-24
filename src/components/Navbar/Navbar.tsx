import React from "react";
import SearchInput from "./SearchInput";
import Authentication from "./Authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex>
      <Box p="2">
        <Heading size="md">Tracklister</Heading>
      </Box>
      <SearchInput />
      <Spacer />
      <ButtonGroup gap="2">
        <Button colorScheme="teal">Categories</Button>
        <Button colorScheme="teal">Upload</Button>
        <Authentication user={user} />
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
