import { Flex, Input, Textarea } from "@chakra-ui/react";
import React from "react";

type MixTagsAndDescriptionProps = {
  mixDescription: string;
  setMixDescription: (value: string) => void;
};

const MixTagsAndDescription: React.FC<MixTagsAndDescriptionProps> = ({
  mixDescription,
  setMixDescription,
}) => {
  return (
    <Flex
      width="100%"
      flexDirection="column"
      alignItems="start"
      pt={4}
      pb={4}
      pl={12}
    >
      <Input
        placeholder="Genres / tags. Select from list or create your own"
        size="lg"
        mb={6}
      />{" "}
      <Textarea
        value={mixDescription}
        onChange={(evt) => setMixDescription(evt.target.value)}
        placeholder="Description"
        size="lg"
        rows={8}
      />
    </Flex>
  );
};
export default MixTagsAndDescription;
