import { uploadMixState } from "@/atoms/uploadMixAtom";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";

const MixUploadImage = () => {
  const [uploadMix, setUploadMix] = useAtom(uploadMixState);
  const selectedImageRef = useRef<HTMLInputElement>(null);

  const onSelectImageToUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setUploadMix((prevState) => ({
          ...prevState,
          selectedImageFile: readerEvent.target?.result as string,
          newImageSelected: true,
        }));
      }
    };
  };

  useEffect(() => {
    const currentImage = uploadMix.mix.imageURL;
    setUploadMix((prevState) => ({
      ...prevState,
      selectedImageFile: currentImage,
      newImageSelected: false,
    }));
  }, [setUploadMix, uploadMix.mix.imageURL]);

  return (
    <Flex
      width="25%"
      justifyContent="center"
      bg={uploadMix.selectedImageFile ? "white" : "blue.900"}
      alignItems="center"
    >
      <Box
        position="relative"
        top={0}
        left={uploadMix.selectedImageFile ? "50%" : 0}
        zIndex={1}
      >
        <Button size="lg" onClick={() => selectedImageRef.current?.click()}>
          {uploadMix.selectedImageFile ? "Change image" : "Upload image"}
        </Button>
      </Box>
      {uploadMix.selectedImageFile && (
        <Image
          src={uploadMix.selectedImageFile}
          alt={uploadMix.selectedImageFile}
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
