import { Button, Center, Heading, Icon, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { BsPlusCircle, BsSoundwave } from "react-icons/bs";

const NoFavouritedMixes = () => {
  return (
    <>
      <Center>
        <Icon as={BsSoundwave} boxSize="150px" color="pink.200" mr={2} />
      </Center>
      <Heading mb={8} textAlign="center" size="xl">
        You haven&apos;t favourited any mixes or shows yet!
      </Heading>
      <Center>
        <Link as={NextLink} href="/dashboard/new-uploads">
          <Button
            height="100px"
            width="300px"
            backgroundColor="blue.500"
            _hover={{ backgroundColor: "blue.600" }}
            color="whiteAlpha.900"
            fontSize="20px"
            textTransform="uppercase"
            leftIcon={<BsPlusCircle size="20px" />}
          >
            Browse new shows
          </Button>
        </Link>
      </Center>
    </>
  );
};
export default NoFavouritedMixes;
