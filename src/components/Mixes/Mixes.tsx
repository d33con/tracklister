import { Mix } from "@/atoms/mixesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import MixItem from "./MixItem";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

type MixesProps = {};

const Mixes: React.FC<MixesProps> = () => {
  const [user] = useAuthState(auth);
  const [loading, isLoading] = useState(false);
  const {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onSelectMix,
    onDeleteMix,
  } = useMixes();
  const getMixes = async () => {
    try {
      // get all mixes
      const mixesQuery = query(collection(firestore, "mixes"));

      const mixDocs = await getDocs(mixesQuery);

      const mixes = mixDocs.docs.map((mix) => ({ ...mix.data() }));
      setMixStateValue((prevState) => ({
        ...prevState,
        mixes: mixes as Mix[],
      }));

      /* 
      get genre filtered mixes
      const genreMixes = query(
        collection(firestore, "mixes"),
        where("genres", "==", queryFromRouter),
        orderBy("createdAt", "desc")
      );
      */
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMixes();
  });

  return (
    <Flex direction="column" m={10} p={10} border="1px solid red">
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
    </Flex>
  );
};
export default Mixes;
