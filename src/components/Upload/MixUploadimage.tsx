import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useRef } from "react";

type MixUploadImageProps = {
  onSelectImageToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const MixUploadImage: React.FC<MixUploadImageProps> = ({
  onSelectImageToUpload,
}) => {
  const uploadImageRef = useRef<HTMLInputElement>(null);
  return (
    <Flex width="25%" justifyContent="center" bg="blue.900" alignItems="center">
      <Button size="lg" onClick={() => uploadImageRef.current?.click()}>
        Upload image
      </Button>
      <input
        type="file"
        ref={uploadImageRef}
        accept="image/*"
        onChange={onSelectImageToUpload}
        hidden
      />
    </Flex>
  );
};
export default MixUploadImage;
