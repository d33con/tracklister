import { Mix } from "@/atoms/mixesAtom";
import PageNotFound from "@/components/Error/PageNotFound";
import AddCommentForm from "@/components/Mix/AddCommentForm";
import MixComments from "@/components/Mix/MixComments";
import MixTracklist from "@/components/Mix/MixTracklist";
import { auth, firestore } from "@/firebase/clientApp";
import useCreator from "@/hooks/useCreator";
import useMixes from "@/hooks/useMixes";
import useUser from "@/hooks/useUser";
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
  Spacer,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  BsCalendar2Week,
  BsCaretRightFill,
  BsPauseCircle,
  BsPlayCircle,
  BsSoundwave,
} from "react-icons/bs";
import { RiDeleteBin7Line, RiEditBoxLine } from "react-icons/ri";

type MixPageProps = {
  slug: string;
  creatorSlug: string;
};

const MixPage: React.FC<MixPageProps> = ({ slug, creatorSlug }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const {
    setMixStateValue,
    onPlayMix,
    onFavouriteMix,
    onPauseMix,
    mixStateValue,
    onDeleteMix,
  } = useMixes();
  const [deletingMix, setDeletingMix] = useState(false);

  const { getCreatorFromSlug } = useCreator();
  const { currentUser } = useUser();
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const getSelectedMix = async () => {
      // setIsLoading(true);
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
      // setIsLoading(false);
    };

    getSelectedMix();
    getCreatorFromSlug(creatorSlug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMixStateValue, slug, creatorSlug]);

  const handleDeleteMix = async () => {
    try {
      setDeletingMix(true);
      const success = await onDeleteMix(mixStateValue.selectedMix!);
      if (!success) {
        throw new Error("Failed to delete mix");
      }
      // success toast
      toast({
        title: "Mix deleted.",
        description: "Your mix has succesfully been deleted",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      // fail toast
      toast({
        title: "Your mix could not be deletd.",
        description: "Please try again.",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
    setDeletingMix(false);
    // redirect back to dashboard
    router.push("/dashboard/my-shows");
  };

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
            <Flex direction="row" alignItems="center" px={24}>
              <Flex direction="column">
                <Flex direction="row" alignItems="center" mb={8}>
                  {mixStateValue.currentlyPlayingMix?.id ===
                    mixStateValue.selectedMix?.id &&
                  mixStateValue.audioPlaying ? (
                    <IconButton
                      variant="link"
                      aria-label="Play audio"
                      fontSize="100px"
                      color="whiteAlpha.900"
                      mr={8}
                      icon={<BsPauseCircle />}
                      onClick={onPauseMix}
                    />
                  ) : (
                    <IconButton
                      variant="link"
                      aria-label="Play audio"
                      fontSize="100px"
                      color="whiteAlpha.900"
                      mr={8}
                      icon={<BsPlayCircle />}
                      onClick={() => onPlayMix(mixStateValue.selectedMix!)}
                    />
                  )}
                  <Heading color="whiteAlpha.900">
                    {mixStateValue.selectedMixCreator?.creatorName} -{" "}
                    {mixStateValue.selectedMix?.title}
                  </Heading>
                </Flex>
                <Flex direction="row" width="100%">
                  {mixStateValue.selectedMix?.favouritedByUsers?.includes(
                    user?.uid as string
                  ) ? (
                    <Button
                      leftIcon={<AiFillHeart />}
                      color="blackAlpha.700"
                      backgroundColor="whiteAlpha.800"
                      _hover={{
                        color: "blackAlpha.600",
                      }}
                      variant="outline"
                      size="sm"
                      mr={8}
                      onClick={() =>
                        onFavouriteMix(mixStateValue.selectedMix as Mix)
                      }
                    >
                      {mixStateValue.selectedMix?.favouriteCount}
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<AiOutlineHeart />}
                      color="whiteAlpha.700"
                      backgroundColor="none"
                      _hover={{
                        color: "whiteAlpha.600",
                      }}
                      variant={"outline"}
                      size="sm"
                      mr={8}
                      onClick={() =>
                        onFavouriteMix(mixStateValue.selectedMix as Mix)
                      }
                    >
                      {mixStateValue.selectedMix?.favouriteCount}
                    </Button>
                  )}
                  {user &&
                    currentUser?.uid ===
                      mixStateValue.selectedMix?.creatorId && (
                      <>
                        <Button
                          as={NextLink}
                          href={`/${mixStateValue.selectedMix?.creatorSlug}/${mixStateValue.selectedMix?.slug}/edit`}
                          leftIcon={<RiEditBoxLine />}
                          color="blackAlpha.900"
                          variant="outline"
                          size="sm"
                          mr={2}
                        >
                          Edit
                        </Button>
                        <Button
                          leftIcon={<RiDeleteBin7Line />}
                          color="blackAlpha.900"
                          variant="outline"
                          size="sm"
                          mr={2}
                          onClick={handleDeleteMix}
                          isLoading={deletingMix}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  <Spacer />
                  <Flex alignItems="center">
                    <Icon
                      as={BsCaretRightFill}
                      color="whiteAlpha.900"
                      verticalAlign="bottom"
                      mr={1}
                    />
                    <Text mr={4} color="whiteAlpha.900" fontSize="14px">
                      {mixStateValue.selectedMix?.playCount}
                    </Text>
                    <Icon
                      as={BsCalendar2Week}
                      mr={3}
                      boxSize="20px"
                      color="whiteAlpha.900"
                    />
                    <Text mr={4} color="whiteAlpha.900" fontSize="14px">
                      {mixStateValue.selectedMix &&
                        formatDistanceToNow(
                          mixStateValue.selectedMix.createdAt.toDate()
                        )}{" "}
                      ago
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Spacer />
              {mixStateValue.selectedMix?.imageURL ? (
                <Image
                  src={mixStateValue.selectedMix?.imageURL}
                  alt={mixStateValue.selectedMix?.title}
                  boxSize="350px"
                  borderRadius={6}
                  mr={8}
                />
              ) : (
                <Icon as={BsSoundwave} boxSize="350px" mr={8} />
              )}
            </Flex>
          </Flex>
          <Flex p={24} direction="column">
            <Card variant="elevated" width="100%">
              <CardBody
                display="flex"
                flexDir="row"
                as={NextLink}
                href={`/${mixStateValue.selectedMixCreator?.creatorSlug}`}
              >
                <Avatar
                  size="lg"
                  mr={4}
                  name={mixStateValue.selectedMixCreator?.creatorName}
                  src={
                    mixStateValue.selectedMixCreator?.photoURL ||
                    "/headshot.png"
                  }
                />
                <Text fontSize="18px">
                  {mixStateValue.selectedMixCreator?.creatorName}
                </Text>
              </CardBody>
            </Card>
            <Flex justifyContent="start" my={12}>
              {mixStateValue.selectedMix?.genres?.map((genre) => (
                <Button
                  as={NextLink}
                  href={`/discover/${genre.toLowerCase().replace(/\W/g, "")}`}
                  key={genre}
                  variant="outline"
                  colorScheme="gray"
                  borderRadius={16}
                  mr={4}
                >
                  {genre}
                </Button>
              ))}
            </Flex>
            <Text mb={8} color="blackAlpha.800">
              {mixStateValue.selectedMix?.description}
            </Text>
            <MixTracklist />
            <AddCommentForm />
            <MixComments />
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
