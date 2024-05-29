import { Mix } from "@/atoms/mixesAtom";
import { firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MixItem from "./MixItem";

const Mixes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mixStateValue, setMixStateValue } = useMixes();

  useEffect(() => {
    const getMixes = async () => {
      setIsLoading(true);
      try {
        // get all mixes
        const mixesQuery = query(collection(firestore, "mixes"));

        const mixDocs = await getDocs(mixesQuery);

        const mixes = mixDocs.docs.map((mix) => ({ ...mix.data() }));
        setMixStateValue((prevState) => ({
          ...prevState,
          mixes: mixes as Mix[],
        }));
      } catch (error: any) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getMixes();
  }, [setMixStateValue]);

  return (
    <>
      <Heading mt={4}>Latest Mixes</Heading>
      <Flex direction="column" my={10}>
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            {mixStateValue.mixes.map((mix) => (
              <MixItem key={mix.id} mix={mix} />
            ))}
          </>
        )}
      </Flex>
    </>
  );
};
export default Mixes;
