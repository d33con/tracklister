import { Box, Input, Textarea } from "@chakra-ui/react";
import React from "react";

type MixTagsAndDescriptionProps = {};

const MixTagsAndDescription: React.FC<MixTagsAndDescriptionProps> = () => {
  return (
    <Box width="100%">
      <Input placeholder="Genres / tags" size="lg" mb={6} />{" "}
      <Textarea
        value=""
        onChange={() => {}}
        placeholder="Description"
        size="lg"
      />
    </Box>
  );
};
export default MixTagsAndDescription;
