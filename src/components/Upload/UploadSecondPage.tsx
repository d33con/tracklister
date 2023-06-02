import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Progress,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MixTagsAndDescription from "./MixTagsAndDescription";
import MixUploadImage from "./MixUploadImage";

type UploadSecondPageProps = {
  uploadPercent: number;
  totalBytes: string;
  bytesTransferred: string;
  selectedFile: File | undefined;
  handleUploadCancel: () => void;
  onSelectImageToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadSecondPage: React.FC<UploadSecondPageProps> = ({
  uploadPercent,
  totalBytes,
  bytesTransferred,
  selectedFile,
  handleUploadCancel,
  onSelectImageToUpload,
}) => {
  const [description, setDescription] = useState("");
  return (
    <Flex w="100%" flexDirection="column" p={12}>
      <HStack mb={6}>
        <Heading textAlign="left">Upload</Heading>
        <Spacer />
        <Button
          onClick={handleUploadCancel}
          variant="ghost"
          textTransform="uppercase"
          isDisabled={uploadPercent === 0}
        >
          Cancel
        </Button>
        <Button
          isDisabled={uploadPercent < 100}
          size="lg"
          backgroundColor="blue.500"
          color="whiteAlpha.900"
          _hover={{ bg: "blue.600" }}
        >
          Publish
        </Button>
      </HStack>
      <Stack w="100%" mb={6}>
        <Box width="100%" pt={4} pb={4}>
          <Progress value={uploadPercent} size="lg" colorScheme="blue" />
        </Box>
      </Stack>
      <HStack>
        <Text>{selectedFile?.name}</Text>
        <Spacer />
        <Text>
          {bytesTransferred ? (
            `${bytesTransferred} of ${totalBytes}`
          ) : (
            <Spinner />
          )}{" "}
          ({uploadPercent}% done)
        </Text>
      </HStack>
      <Flex pt={8} pb={8}>
        <MixUploadImage onSelectImageToUpload={onSelectImageToUpload} />
        <MixTagsAndDescription
          description={description}
          setDescription={setDescription}
        />
      </Flex>
    </Flex>
  );
};
export default UploadSecondPage;
