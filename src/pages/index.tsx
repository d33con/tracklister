import HeadMetatags from "@/components/Layout/HeadMetatags";
import LoggedOutHomepage from "@/components/LoggedOut/LoggedOutHomepage";
import LatestMixes from "@/components/Mixes/LatestMixes";
import { auth } from "@/firebase/clientApp";
import useUser from "@/hooks/useUser";
import { Flex, Text } from "@chakra-ui/react";
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
      <HeadMetatags />
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
            <LatestMixes />
          </>
        ) : (
          <>
            <LoggedOutHomepage />
            <LatestMixes />
          </>
        )}
      </Flex>
    </>
  );
}
