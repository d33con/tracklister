import { Mix } from "@/atoms/mixesAtom";
import { convertDuration } from "@/helpers/convertDuration";
import useMixes from "@/hooks/useMixes";
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCaretRightFill, BsPlayCircle, BsSoundwave } from "react-icons/bs";
import { RiDeleteBin7Line, RiEditBoxLine } from "react-icons/ri";

type MixItemProps = {
  mix: Mix;
  userIsCreator: boolean;
  userFavourited?: boolean;
  onFavouriteMix: () => void;
  onDeleteMix: () => void;
  onSelectMix: () => void;
};

const MixItem: React.FC<MixItemProps> = ({
  mix,
  userIsCreator,
  userFavourited,
  onFavouriteMix,
  onDeleteMix,
  onSelectMix,
}) => {
  const { mixStateValue, setMixStateValue } = useMixes();
  const handlePlayMixClick = () => {
    setMixStateValue((prevState) => ({
      ...prevState,
      currentlyPlayingMix: mix,
    }));
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
          <IconButton
            variant="link"
            aria-label="Play audio"
            fontSize="50px"
            color="black"
            mr={8}
            icon={<BsPlayCircle />}
            onClick={handlePlayMixClick}
          />
          <Flex textAlign="left" direction="column">
            <Text fontSize="18px" fontWeight="bold">
              {mix.title}
            </Text>
            <Text>{userIsCreator ? "" : "author"}</Text>
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
          >
            1
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
            <Text key={genre} color="blackAlpha.800" fontSize="14px" mr={1}>
              {`#${genre}`}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MixItem;
