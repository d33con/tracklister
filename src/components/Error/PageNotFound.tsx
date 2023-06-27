import { Center, Heading, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { BsSoundwave } from "react-icons/bs";

const PageNotFound = () => {
  return (
    <>
      <Center>
        <Icon as={BsSoundwave} boxSize="150px" color="pink.200" mr={2} />
      </Center>
      <Heading mb={8} textAlign="center" size="xl">
        Page Not Found
      </Heading>
      <Center>
        <Link as={NextLink} href="/">
          <Heading
            mb={8}
            textAlign="center"
            size="xl"
            textDecoration="underline"
          >
            Go home
          </Heading>
        </Link>
      </Center>
    </>
  );
};
export default PageNotFound;
