import { Mix } from "@/atoms/mixesAtom";
import MixItem from "@/components/Mixes/MixItem";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Center, Heading, Spinner } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

type MyShowsProps = {};

const MyShows: React.FC<MyShowsProps> = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
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
        // get my mixes
        const myMixesQuery = query(
          collection(firestore, "mixes"),
          where("creatorId", "==", user?.uid),
          orderBy("createdAt", "desc")
        );

        const myMixDocs = await getDocs(myMixesQuery);

        const myMixes = myMixDocs.docs.map((mix) => ({ ...mix.data() }));
        setMixStateValue((prevState) => ({
          ...prevState,
          mixes: myMixes as Mix[],
        }));
      } catch (error: any) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getMixes();
  }, [setMixStateValue, user?.uid]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <Heading textAlign="left" mb={6}>
            My Shows
          </Heading>
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
    </DashboardLayout>
  );
};
export default MyShows;