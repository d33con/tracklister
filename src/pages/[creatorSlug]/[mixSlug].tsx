import { Mix } from "@/atoms/mixesAtom";
import NoUserMixes from "@/components/Dashboard/NoUserMixes";
import MixItem from "@/components/Mixes/MixItem";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { Flex, Center, Spinner, Heading } from "@chakra-ui/react";
import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type MixPageProps = {
  slug: string;
};

const MixPage: React.FC<MixPageProps> = ({ slug }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [noMixes, setNoMixes] = useState(false);
  const {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onSelectMix,
    onDeleteMix,
    onPlayMix,
  } = useMixes();

  useEffect(() => {
    const getMixes = async () => {
      setIsLoading(true);
      try {
        // get my mixes
        const myMixesQuery = query(
          collection(firestore, "mixes"),
          where("slug", "==", slug)
        );

        const myMixDocs = await getDocs(myMixesQuery);

        const myMixes = myMixDocs.docs.map((mix) => ({ ...mix.data() }));

        if (myMixes.length === 0) {
          setNoMixes(true);
        }

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
  }, [setMixStateValue, slug]);

  return (
    <Flex direction="column" p={24}>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : noMixes ? (
        <NoUserMixes />
      ) : (
        <>
          <Heading textAlign="left" mb={6}>
            {slug}
          </Heading>
          {mixStateValue.mixes.map((mix) => (
            <MixItem
              key={mix.id}
              mix={mix}
              onFavouriteMix={onFavouriteMix}
              onSelectMix={onSelectMix}
              onDeleteMix={onDeleteMix}
              userIsCreator={user?.uid === mix.creatorId}
              onPlayMix={onPlayMix}
            />
          ))}
        </>
      )}
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    return {
      props: {
        slug: context.query.mixSlug,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default MixPage;
