import { Mix } from "@/atoms/mixesAtom";
import { auth } from "@/firebase/clientApp";
import { convertDuration } from "@/helpers/convertDuration";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Link,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { User } from "firebase/auth";
import NextLink from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCaretRightFill, BsPlayCircle, BsSoundwave } from "react-icons/bs";
import { RiDeleteBin7Line, RiEditBoxLine } from "react-icons/ri";

type MixItemProps = {
  mix: Mix;
  userIsCreator: boolean;
  userFavourited?: boolean;
  onFavouriteMix: (mix: Mix, user: User) => void;
  onDeleteMix: (mix: Mix, user: User) => Promise<boolean>;
  onSelectMix: () => void;
  onPlayMix: (mix: Mix) => void;
};

const MixItem: React.FC<MixItemProps> = ({
  mix,
  userIsCreator,
  userFavourited,
  onFavouriteMix,
  onDeleteMix,
  onSelectMix,
  onPlayMix,
}) => {
  // TODO : allow playing and pausing in main window
  // const { mixStateValue } = useMixes();
  const toast = useToast();
  const [user] = useAuthState(auth);
  const [deletingMix, setDeletingMix] = useState(false);

  const handleDeleteMix = async () => {
    try {
      setDeletingMix(true);
      const success = await onDeleteMix(mix, user as User);
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
  };

  return (
    <Flex direction="row" mb={8} width="100%">
      {mix.imageURL ? (
        <Image
          src={mix.imageURL}
          alt={mix.title}
          boxSize="150px"
          borderRadius={6}
          mr={8}
        />
      ) : (
        <Icon as={BsSoundwave} boxSize="150px" mr={8} />
      )}
      <Flex direction="column" width="100%">
        <Flex direction="row" mb={8}>
          {/* {mixStateValue.currentlyPlayingMix?.id === mix.id ? (
            <IconButton
              variant="link"
              aria-label="Pause audio"
              fontSize="50px"
              color="blackAlpha.900"
              mr={4}
              icon={<BsPauseCircle />}
              // onClick={() => onPauseMix()}
            />
          ) : ( */}
          <IconButton
            variant="link"
            aria-label="Play audio"
            fontSize="50px"
            color="black"
            mr={8}
            icon={<BsPlayCircle />}
            onClick={() => onPlayMix(mix)}
          />
          {/* )} */}
          <Flex textAlign="left" direction="column">
            <Link as={NextLink} href={`/${mix.creatorSlug}/${mix.slug}`} mr={6}>
              <Text fontSize="18px" fontWeight="bold">
                {mix.title}
              </Text>
            </Link>
            {userIsCreator ? null : (
              <Link as={NextLink} href={`/${mix.creatorSlug}/`} mr={6}>
                <Text fontSize="16px">{mix.creatorName}</Text>
              </Link>
            )}
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb={4} mr={4}>
          <Box bgColor="gray.100" height="3px" width="100%" pr={8} />
          <Text fontSize="14px" color="blackAlpha.700" ml={6}>
            {convertDuration(mix.audioDuration!)}
          </Text>
        </Flex>
        <Flex direction="row" alignItems="center" mr={4}>
          <Button
            leftIcon={<AiOutlineHeart />}
            color="blackAlpha.700"
            variant="outline"
            size="sm"
            mr={2}
            onClick={() => onFavouriteMix(mix, user)}
          >
            {mix.favouriteCount}
          </Button>
          {userIsCreator && (
            <>
              <Button
                leftIcon={<RiEditBoxLine />}
                color="blackAlpha.700"
                variant="outline"
                size="sm"
                mr={2}
              >
                Edit
              </Button>
              <Button
                leftIcon={<RiDeleteBin7Line />}
                color="blackAlpha.700"
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
          <Icon
            as={BsCaretRightFill}
            color="blackAlpha.700"
            verticalAlign="bottom"
            mr={1}
          />
          <Text mr={4} color="blackAlpha.700" fontSize="14px">
            25
          </Text>
          <Text mr={4} color="blackAlpha.700" fontSize="14px">
            {formatDistanceToNow(mix.createdAt.toDate())} ago
          </Text>
          {mix.genres?.map((genre) => (
            <Link
              as={NextLink}
              href={`/discover/${genre.toLowerCase().replace(/\W/g, "")}`}
              key={genre}
              color="blackAlpha.800"
              fontSize="14px"
              mr={1}
            >
              {`#${genre}`}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MixItem;
