import { Box, Button } from "@chakra-ui/react";
import React from "react";

type MixUploadImageProps = {};

const MixUploadImage: React.FC<MixUploadImageProps> = () => {
  return (
    <Box width="25%" p={6}>
      <Button>Change image</Button>
      <input type="file" hidden />
    </Box>
  );
};
export default MixUploadImage;
