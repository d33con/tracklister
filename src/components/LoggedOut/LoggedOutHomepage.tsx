import { Center, HStack, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreatorCard from "../Cards/CreatorCard";
import {
  HomepageUsersState,
  homepageUsersState,
} from "@/atoms/homepageUsersAtom";
import { firestore } from "@/firebase/clientApp";
import { query, collection, getDocs, limit } from "firebase/firestore";
import { useRecoilState } from "recoil";

const LoggedOutHomepage = () => {
  const [homepageUsers, setHomepageUsers] = useRecoilState(homepageUsersState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        // get last 3 logged in users
        const usersQuery = query(collection(firestore, "users"), limit(3));

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
    <HStack bg="blue.400" spacing={6} justifyContent="center" py={12} mx={-48}>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        homepageUsers.map((creator) => (
          <CreatorCard key={creator.uid} creator={creator} />
        ))
      )}
    </HStack>
  );
};

export default LoggedOutHomepage;
