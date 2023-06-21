import useUser from "@/hooks/useUser";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  const { loggedInUserStateValue, getLoggedInUser } = useUser();

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <Flex px={24} my={10} alignItems="center" direction="column">
      <Heading mb={8}>Your profile settings</Heading>
      <Box bg="blackAlpha.300" p={3} mb={6}>
        <Link
          as={NextLink}
          color="blackAlpha.900"
          href={`/${loggedInUserStateValue.user?.creatorSlug}`}
          textAlign="center"
        >
          View your profile
        </Link>
      </Box>
      <form onSubmit={() => {}}>
        <FormControl mb={4}>
          <FormLabel>Creator name</FormLabel>
          <Input
            type="text"
            name="creatorName"
            value={loggedInUserStateValue.user?.creatorName}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            name="email"
            value={loggedInUserStateValue.user?.email}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Profile picture</FormLabel>
          <Input type="file" name="photoURL" />
          <Image
            boxSize="200px"
            src={
              loggedInUserStateValue.user?.photoURL ||
              "https://react.semantic-ui.com/images/avatar/large/matthew.png"
            }
            alt={loggedInUserStateValue.user?.creatorName}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Biography</FormLabel>
          <Textarea
            value={loggedInUserStateValue.user?.biography}
            placeholder="Biography"
            size="lg"
            rows={4}
          />
        </FormControl>
        <Box>
          <Button
            width="100%"
            size="lg"
            ml={4}
            backgroundColor="blue.500"
            color="whiteAlpha.900"
            _hover={{ bg: "blue.600" }}
            textTransform="uppercase"
            // isDisabled={mixTitle.length === 0}
            type="submit"
          >
            Save profile settings
          </Button>
        </Box>
      </form>
    </Flex>
  );
};
export default Profile;
