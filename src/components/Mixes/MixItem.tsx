import { Mix } from "@/atoms/mixesAtom";
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

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
  return (
    <Flex direction="row" mb={8} width="100%">
      <Image
        src={mix.imageURL}
        alt={mix.title}
        boxSize="150px"
        objectFit="cover"
        borderRadius={6}
        mr={8}
      />
      <Flex direction="column" width="100%">
        <Flex direction="row" mb={8}>
          <audio src={mix.audioURL} hidden />
          <Button mr={8}>Play button</Button>
          <VStack>
            <Text fontSize="16px" fontWeight="bold">
              {mix.title}
            </Text>
            <Text>author</Text>
          </VStack>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb={4} mr={4}>
          <Box bgColor="gray.100" height="3px" width="100%" pr={8} />
          <Text fontSize="12px">{mix.audioLength}</Text>
        </Flex>
        <Flex direction="row" alignItems="center">
          <Button>Like</Button>
          {userIsCreator && <Text>Edit buttons</Text>}
          <Spacer />
          <Text>plays</Text>
          <Text>mix.createdAt</Text>
          <Text>genres</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default MixItem;
