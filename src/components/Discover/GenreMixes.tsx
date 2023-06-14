import { MixGenre } from "@/atoms/mixGenresAtom";
import { Mix } from "@/atoms/mixesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Flex, Center, Spinner } from "@chakra-ui/react";
import { query, collection, getDocs, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import MixItem from "../Mixes/MixItem";
import NotFound from "./NotFound";

type GenreMixesProps = {
  mixGenre: MixGenre;
};

const GenreMixes: React.FC<GenreMixesProps> = ({ mixGenre }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [noMixes, setNoMixes] = useState(false);
  const {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onSelectMix,
    onDeleteMix,
  } = useMixes();

  useEffect(() => {
    const getMixes = async () => {
      setIsLoading(true);
      try {
        // get genre filtered mixes
        const genreMixes = query(
          collection(firestore, "mixes"),
          where("genres", "array-contains", mixGenre.displayName)
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
  }, [setMixStateValue, mixGenre.displayName]);

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
            <MixItem
              key={mix.id}
              mix={mix}
              onFavouriteMix={onFavouriteMix}
              onSelectMix={onSelectMix}
              onDeleteMix={onDeleteMix}
              userIsCreator={user?.uid === mix.creatorId}
            />
          ))}
        </>
      )}
    </Flex>
  );
};
export default GenreMixes;
