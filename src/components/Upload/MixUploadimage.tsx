import { Box, Button } from "@chakra-ui/react";
import React from "react";

type MixUploadimageProps = {};

const MixUploadimage: React.FC<MixUploadimageProps> = () => {
  return (
    <Box width="25%" p={6}>
      <Button>Change image</Button>
      <input type="file" hidden />
    </Box>
  );
};
export default MixUploadimage;
