import { Flex, Input, StepDescription, Textarea } from "@chakra-ui/react";
import React, { HTMLInputTypeAttribute, useState } from "react";

type MixTagsAndDescriptionProps = {
  description: string;
  setDescription: (value: string) => void;
};

const MixTagsAndDescription: React.FC<MixTagsAndDescriptionProps> = ({
  description,
  setDescription,
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
      <Input placeholder="Genres / tags" size="lg" mb={6} />{" "}
      <Textarea
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
        placeholder="Description"
        size="lg"
        rows={8}
      />
    </Flex>
  );
};
export default MixTagsAndDescription;
