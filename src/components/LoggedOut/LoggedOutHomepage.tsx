import { HStack } from "@chakra-ui/react";
import React from "react";
import CreatorCard from "../Cards/CreatorCard";

const LoggedOutHomepage: React.FC = () => {
  return (
    <HStack bg="blue.300" spacing={6} justifyContent="center" pt={12} pb={12}>
      <CreatorCard />
      <CreatorCard />
      <CreatorCard />
    </HStack>
  );
};

export default LoggedOutHomepage;
