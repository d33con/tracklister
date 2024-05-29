import {
  HomepageUsersState,
  homepageUsersState,
} from "@/atoms/homepageUsersAtom";
import { firestore } from "@/firebase/clientApp";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CreatorCard from "../Cards/CreatorCard";

const LoggedOutHomepage = () => {
  const [homepageUsers, setHomepageUsers] = useRecoilState(homepageUsersState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        // get last 3 logged in users
        const usersQuery = query(collection(firestore, "users"), limit(4));

        const userDocs = await getDocs(usersQuery);

        const creators = userDocs.docs.map((mix) => ({
          ...mix.data(),
        }));

        creators.sort((a, b) => b.lastLoginAt - a.lastLoginAt);

        setHomepageUsers(creators as HomepageUsersState);
      } catch (error: any) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getUsers();
  }, [setHomepageUsers]);

  return (
    <Flex
      bg="blue.400"
      gap={6}
      justifyContent="center"
      flexWrap="wrap"
      py={12}
      mx={-48}
    >
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        homepageUsers.map((creator) => (
          <CreatorCard key={creator.uid} creator={creator} />
        ))
      )}
    </Flex>
  );
};

export default LoggedOutHomepage;
