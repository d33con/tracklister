import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React, { useRef } from "react";

type MixUploadImageProps = {
  onSelectImageToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  mixImage?: string;
};

const MixUploadImage: React.FC<MixUploadImageProps> = ({
  onSelectImageToUpload,
  mixImage,
}) => {
  const selectedImageRef = useRef<HTMLInputElement>(null);
  return (
    <Flex
      width="25%"
      justifyContent="center"
      bg={mixImage ? "white" : "blue.900"}
      alignItems="center"
    >
      <Box position="relative" top={0} left={mixImage ? "50%" : 0} zIndex={1}>
        <Button size="lg" onClick={() => selectedImageRef.current?.click()}>
          {mixImage ? "Change image" : "Upload image"}
        </Button>
      </Box>
      {mixImage && (
        <Image
          src={mixImage}
          alt={mixImage}
          position="relative"
          left="-25%"
          boxSize="450px"
          objectFit="cover"
        />
      )}
      <input
        type="file"
        ref={selectedImageRef}
        accept="image/*"
        onChange={onSelectImageToUpload}
        hidden
      />
    </Flex>
  );
};
export default MixUploadImage;
