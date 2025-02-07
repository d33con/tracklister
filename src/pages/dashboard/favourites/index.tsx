import { Mix } from "@/atoms/mixesAtom";
import NoFavouritedMixes from "@/components/Dashboard/NoFavouritedMixes";
import HeadMetatags from "@/components/Layout/HeadMetatags";
import MixItem from "@/components/Mixes/MixItem";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Center, Heading, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const Favourites = () => {
  const [user] = useAuthState(auth);
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
          where("favouritedByUsers", "array-contains", user?.uid)
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
  }, [setMixStateValue, user?.uid]);

  return (
    <DashboardLayout>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : noMixes ? (
        <NoFavouritedMixes />
      ) : (
        <>
          <HeadMetatags title="Dashboard - Favourite mixes" />
          <Heading textAlign="left" mb={6}>
            Favourites
          </Heading>
          {mixStateValue.mixes.map((mix) => (
            <MixItem key={mix.id} mix={mix} />
          ))}
        </>
      )}
    </DashboardLayout>
  );
};
export default Favourites;
