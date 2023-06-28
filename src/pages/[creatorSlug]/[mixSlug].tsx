import { Mix } from "@/atoms/mixesAtom";
import PageNotFound from "@/components/Error/PageNotFound";
import { auth, firestore } from "@/firebase/clientApp";
import useCreator from "@/hooks/useCreator";
import useMixes from "@/hooks/useMixes";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsPlayCircle, BsSoundwave } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

type MixPageProps = {
  slug: string;
  creatorSlug: string;
};

const MixPage: React.FC<MixPageProps> = ({ slug, creatorSlug }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { mixStateValue, setMixStateValue, onPlayMix, onFavouriteMix } =
    useMixes();

  const { getCreatorFromSlug } = useCreator();

  useEffect(() => {
    const getSelectedMix = async () => {
      setIsLoading(true);
      try {
        // get the mix with this slug
        const singleMixQuery = query(
          collection(firestore, "mixes"),
          where("slug", "==", slug)
        );

        const singleMixDocs = await getDocs(singleMixQuery);

        if (singleMixDocs.docs.length === 0) {
          setNotFound(true);
        }

        const currentMix = singleMixDocs.docs[0].data();

        setMixStateValue((prevState) => ({
          ...prevState,
          selectedMix: currentMix as Mix,
        }));
      } catch (error: any) {
        console.log(error.message);
      }
      setIsLoading(false);
    };

    getSelectedMix();
    getCreatorFromSlug(creatorSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMixStateValue, slug, creatorSlug]);

  return (
    <Flex direction="column">
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : notFound ? (
        <PageNotFound />
      ) : (
        <Flex direction="column">
          <Flex direction="column" p={24} backgroundColor="blackAlpha.700">
            <Flex direction="row" alignItems="center">
              <Flex direction="column">
                <Flex direction="row" alignItems="center" mb={8}>
                  <IconButton
                    variant="link"
                    aria-label="Play audio"
                    fontSize="100px"
                    color="whiteAlpha.900"
                    mr={8}
                    icon={<BsPlayCircle />}
                    onClick={() => onPlayMix(mixStateValue.selectedMix!)}
                  />
                  <Heading>
                    {mixStateValue.selectedMixCreator?.creatorName} -{" "}
                    {mixStateValue.selectedMix!.title}
                  </Heading>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Button
                    leftIcon={<AiOutlineHeart />}
                    color="whiteAlpha.900"
                    _hover={{ color: "whiteAlpha.700" }}
                    variant="outline"
                    size="sm"
                    mr={2}
                    onClick={() =>
                      onFavouriteMix(mixStateValue.selectedMix!, user)
                    }
                  >
                    {mixStateValue.selectedMix?.favouriteCount}
                  </Button>
                  <Text mr={4} color="whiteAlpha.900" fontSize="14px">
                    {formatDistanceToNow(
                      mixStateValue.selectedMix!.createdAt!.toDate()
                    )}{" "}
                    ago
                  </Text>
                </Flex>
              </Flex>
              <Spacer />
              {mixStateValue.selectedMix?.imageURL ? (
                <Image
                  src={mixStateValue.selectedMix!.imageURL}
                  alt={mixStateValue.selectedMix!.title}
                  boxSize="350px"
                  borderRadius={6}
                  mr={8}
                />
              ) : (
                <Icon as={BsSoundwave} boxSize="350px" mr={8} />
              )}
            </Flex>
          </Flex>
          <Flex p={24} direction="column" mt={-6}>
            <Card variant="elevated" width="100%">
              <Link
                as={NextLink}
                href={`/${mixStateValue.selectedMixCreator?.creatorSlug}`}
              >
                <CardBody display="flex" flexDir="row">
                  <Avatar
                    size="lg"
                    mr={4}
                    name={mixStateValue.selectedMixCreator?.creatorName}
                    src={mixStateValue.selectedMixCreator?.photoURL}
                  />
                  <Text fontSize="18px">
                    {mixStateValue.selectedMixCreator?.creatorName}
                  </Text>
                </CardBody>
              </Link>
            </Card>
            <Flex justifyContent="start" my={12}>
              {mixStateValue.selectedMix!.genres?.map((genre) => (
                <Link
                  as={NextLink}
                  href={`/discover/${genre.toLowerCase().replace(/\W/g, "")}`}
                  key={genre}
                >
                  <Button
                    variant="outline"
                    colorScheme="gray"
                    borderRadius={16}
                    mr={4}
                  >
                    {genre}
                  </Button>
                </Link>
              ))}
            </Flex>
            <Text mb={8} color="blackAlpha.800">
              {mixStateValue.selectedMix!.description}
            </Text>
            <Heading mb={8}>Tracklist</Heading>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Track</Th>
                    <Th>Label</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mixStateValue.selectedMix!.tracklist?.map((track) => {
                    const minutes = Math.floor(track.trackTime / 60);
                    let seconds = track.trackTime % 60;
                    const secondsString =
                      seconds < 10 ? `0${seconds}` : `${seconds}`;
                    return (
                      <Tr key={track.id}>
                        <Td>
                          {minutes}:{secondsString}
                        </Td>
                        <Td>{track.trackName}</Td>
                        <Td>{track.label}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    return {
      props: {
        slug: context.query.mixSlug,
        creatorSlug: context.query.creatorSlug,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default MixPage;
