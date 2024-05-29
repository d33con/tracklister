import { Creator, Mix } from "@/atoms/mixesAtom";
import NoUserMixes from "@/components/Dashboard/NoUserMixes";
import MixItem from "@/components/Mixes/MixItem";
import { firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { GoLink, GoLocation } from "react-icons/go";

type CreatorProfileProps = {
  creator: Creator;
};

const CreatorProfile: React.FC<CreatorProfileProps> = ({ creator }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [noMixes, setNoMixes] = useState(false);
  const { mixStateValue, setMixStateValue } = useMixes();

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
        <Flex direction={{ base: "column", xl: "row" }} justifyContent="start">
          <Box m={{ base: "0 auto 24px", xl: "0" }}>
            <Card variant="elevated" width="sm" p={8}>
              <CardBody
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Image
                  src={creator.photoURL || "/headshot.png"}
                  alt={creator.creatorName}
                  width={200}
                  height={200}
                  style={{ borderRadius: "50%", margin: "0 auto" }}
                />
                <Stack mt="6" spacing="3">
                  <Heading size="lg" textAlign="center">
                    {creator.creatorName}
                  </Heading>
                  <Text color="blue.600" fontSize="xl" textAlign="left">
                    {creator.location && (
                      <>
                        <Icon as={GoLocation} mr={1} boxSize="15px" />
                        {creator.location}
                      </>
                    )}
                  </Text>
                  <Text textAlign="left">{creator.biography}</Text>
                  {creator.website && (
                    <Link href={`https://${creator.website}`} isExternal>
                      <Text textAlign="left">
                        <Icon as={GoLink} mr={2} boxSize="15px" />
                        {creator.website}
                      </Text>
                    </Link>
                  )}
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Flex
            direction="column"
            ml={{ base: 0, lg: 16 }}
            w={{ base: "100%", lg: "75%" }}
          >
            <Heading textAlign="left" mb={8}>
              Shows
            </Heading>
            {mixStateValue.mixes.map((mix) => (
              <MixItem key={mix.id} mix={mix} />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const creatorDocRef = doc(
      firestore,
      "users",
      context.query.creatorSlug as string
    );
    const creatorDoc = await getDoc(creatorDocRef);

    return {
      props: {
        creator: creatorDoc.exists() ? { ...creatorDoc.data() } : {},
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default CreatorProfile;
