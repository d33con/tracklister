import LoggedOutHomepage from "@/components/LoggedOut/LoggedOutHomepage";
import Mixes from "@/components/Mixes/Mixes";
import { auth } from "@/firebase/clientApp";
import useUser from "@/hooks/useUser";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const { loggedInUserStateValue } = useUser();

  return (
    <>
      <Flex direction="column" justifyContent="center">
        {user ? (
          <>
            <Text
              textAlign="center"
              fontSize="18px"
              pb={8}
              pt={8}
              backgroundColor="green.200"
            >
              Hello, {loggedInUserStateValue.user?.creatorName}
            </Text>
            <Heading pl={10} pr={10} mt={4}>
              Latest Mixes
            </Heading>
            <Mixes />
          </>
        ) : (
          <>
            <LoggedOutHomepage />
            <Heading pl={10} pr={10} mt={4}>
              Latest Mixes
            </Heading>
            <Mixes />
          </>
        )}
      </Flex>
    </>
  );
}
