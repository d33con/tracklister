import { MixGenre } from "@/atoms/mixGenresAtom";
import { Mix } from "@/atoms/mixesAtom";
import { firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Center, Flex, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MixItem from "../Mixes/MixItem";
import NotFound from "./NotFound";

type GenreMixesProps = {
  mixGenre: MixGenre;
};

const GenreMixes: React.FC<GenreMixesProps> = ({ mixGenre }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [noMixes, setNoMixes] = useState(false);
  const { mixStateValue, setMixStateValue } = useMixes();

  useEffect(() => {
    const getMixes = async () => {
      setIsLoading(true);
      try {
        // get genre filtered mixes
        const genreMixes = query(
          collection(firestore, "mixes"),
          where("genres", "array-contains", mixGenre.label)
        );

        const mixDocs = await getDocs(genreMixes);

        const mixes = mixDocs.docs.map((mix) => ({ ...mix.data() }));

        if (mixes.length === 0) {
          setNoMixes(true);
        }

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
  }, [setMixStateValue, mixGenre.label]);

  return (
    <Flex direction="column" m={10} p={10}>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : noMixes ? (
        <NotFound />
      ) : (
        <>
          {mixStateValue.mixes.map((mix) => (
            <MixItem key={mix.id} mix={mix} />
          ))}
        </>
      )}
    </Flex>
  );
};
export default GenreMixes;
