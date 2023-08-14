import LoggedOutHomepage from "@/components/LoggedOut/LoggedOutHomepage";
import Mixes from "@/components/Mixes/Mixes";
import { auth } from "@/firebase/clientApp";
import useUser from "@/hooks/useUser";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const { currentUser, getLoggedInUser } = useUser();

  useEffect(() => {
    if (user && !loading) {
      getLoggedInUser();
    }
  }, [user, loading, getLoggedInUser]);

  return (
    <>
      <Flex direction="column" justifyContent="center" px={48}>
        {user ? (
          <>
            <Text
              textAlign="center"
              fontSize="18px"
              pb={8}
              pt={8}
              backgroundColor="green.200"
              mx={-48}
            >
              Hello, {currentUser?.creatorName}
            </Text>
            <Heading mt={4}>Latest Mixes</Heading>
            <Mixes />
          </>
        ) : (
          <>
            <LoggedOutHomepage />
            <Heading mt={4}>Latest Mixes</Heading>
            <Mixes />
          </>
        )}
      </Flex>
    </>
  );
}
