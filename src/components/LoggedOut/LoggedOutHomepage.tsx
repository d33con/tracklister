import { HStack } from "@chakra-ui/react";
import React from "react";
import CreatorCard from "../Cards/CreatorCard";

const LoggedOutHomepage = () => {
  return (
    <HStack bg="blue.400" spacing={6} justifyContent="center" py={12} mx={-48}>
      <CreatorCard />
      <CreatorCard />
      <CreatorCard />
    </HStack>
  );
};

export default LoggedOutHomepage;
