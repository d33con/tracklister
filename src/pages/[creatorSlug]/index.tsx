import { Mix } from "@/atoms/mixesAtom";
import { LoggedInUser } from "@/atoms/userAtom";
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
import safeJSONStringify from "safe-json-stringify";

type CreatorProfileProps = {
  creator: Creator;
};

const CreatorProfile: React.FC<CreatorProfileProps> = ({ creator }) => {
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
        // get creator's mixes
        const creatorMixesQuery = query(
          collection(firestore, "mixes"),
          where("creatorSlug", "==", creator.creatorSlug)
        );

        const creatorMixDocs = await getDocs(creatorMixesQuery);

        const creatorMixes = creatorMixDocs.docs.map((mix) => ({
          ...mix.data(),
        }));

        if (creatorMixes.length === 0) {
          setNoMixes(true);
        }

        creatorMixes.sort((a, b) => b.createdAt - a.createdAt);

        setMixStateValue((prevState) => ({
          ...prevState,
          mixes: creatorMixes as Mix[],
        }));
      } catch (error: any) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    getMixes();
  }, [setMixStateValue, creator]);

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
            {`${creator.creatorName}'s Shows`}
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
    const creatorDocRef = query(
      collection(firestore, "users"),
      where("creatorSlug", "==", context.query.creatorSlug)
    );

    const creatorSnapshot = await getDocs(creatorDocRef);

    let creatorArray = [] as Array<object>;

    creatorSnapshot.forEach((doc) => {
      creatorArray.push(doc.data());
    });

    return {
      props: {
        creator: creatorArray[0] || "",
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default CreatorProfile;
