import { Mix } from "@/atoms/mixesAtom";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import HeadMetatags from "@/components/Layout/HeadMetatags";
import MixItem from "@/components/Mixes/MixItem";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Center, Heading, Spinner } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const NewUploads = () => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const { mixStateValue, setMixStateValue } = useMixes();

  useEffect(() => {
    const getMixes = async () => {
      setIsLoading(true);
      try {
        // get other creator's mixes
        const newMixesQuery = query(
          collection(firestore, "mixes"),
          where("creatorId", "!=", user?.uid)
        );

        const newMixDocs = await getDocs(newMixesQuery);

        const newMixes = newMixDocs.docs.map((mix) => ({ ...mix.data() }));

        // sort in place because apparently firestore can't orderBy using a different index to the one you are filtering by!!!
        newMixes.sort((a, b) => b.createdAt - a.createdAt);
        setMixStateValue((prevState) => ({
          ...prevState,
          mixes: newMixes as Mix[],
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
          <HeadMetatags title="Dashboard - New mixes and shows" />
          <Heading textAlign="left" mb={6}>
            New Uploads
          </Heading>
          {mixStateValue.mixes.map((mix) => (
            <MixItem key={mix.id} mix={mix} />
          ))}
        </>
      )}
    </DashboardLayout>
  );
};
export default NewUploads;
