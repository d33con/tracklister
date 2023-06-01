import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const UploadLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex
        bg="blue.900"
        color="whiteAlpha.900"
        justifyContent="center"
        pt={20}
        pb={40}
      >
        <Heading size="xl">Upload</Heading>
      </Flex>
      <Flex justifyContent="center" marginTop="-80px" pb={4}>
        {children}
      </Flex>
    </>
  );
};
export default UploadLayout;
