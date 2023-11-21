import { Button, Center, Heading, Icon, Text } from "@chakra-ui/react";
import { default as Link, default as NextLink } from "next/link";
import { BsPlusCircle, BsSoundwave } from "react-icons/bs";

const NotFound = () => {
  return (
    <>
      <Center>
        <Icon as={BsSoundwave} boxSize="150px" color="pink.200" mr={2} />
      </Center>
      <Heading mb={8} textAlign="center" size="xl">
        Sorry there are no shows with that genre or tag
      </Heading>
      <Center>
        <Button
          as={NextLink}
          href="/upload"
          height="100px"
          width="300px"
          backgroundColor="blue.500"
          _hover={{ backgroundColor: "blue.600" }}
          color="whiteAlpha.900"
          fontSize="20px"
          textTransform="uppercase"
          leftIcon={<BsPlusCircle size="20px" />}
        >
          Upload one now
        </Button>
      </Center>
      <Center>
        <Text mt={8}>
          <Link href="/discover">Browse categories</Link>
        </Text>
      </Center>
    </>
  );
};
export default NotFound;
