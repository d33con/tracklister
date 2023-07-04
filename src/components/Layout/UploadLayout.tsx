import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

const UploadLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Flex
        bg="blue.900"
        color="whiteAlpha.900"
        justifyContent="center"
        py={20}
        px={48}
      >
        <Heading size="xl" mb={20}>
          Upload
        </Heading>
      </Flex>
      <Flex justifyContent="center" marginTop="-80px" pb={4}>
        {children}
      </Flex>
    </>
  );
};
export default UploadLayout;
