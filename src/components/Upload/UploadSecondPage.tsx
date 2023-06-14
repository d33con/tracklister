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
import React from "react";
import { MultiValue } from "react-select/dist/declarations/src/types";
import MixTagsAndDescription from "./MixTagsAndDescription";
import UploadMixImage from "./UploadMixImage";

type UploadSecondPageProps = {
  uploadPercent: number;
  totalBytes: string;
  bytesTransferred: string;
  selectedFile: File | null;
  handleUploadCancel: () => void;
  onSelectImageToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  mixImage?: string;
  mixDescription: string;
  setMixDescription: (value: string) => void;
  publishMix: (evt: React.FormEvent<HTMLFormElement>) => void;
  isPublishing: boolean;
  audioDownloadURL: string;
  setMixGenres: (
    newValue: MultiValue<{ value: string; label: string }>
  ) => void;
};

const UploadSecondPage: React.FC<UploadSecondPageProps> = ({
  uploadPercent,
  totalBytes,
  bytesTransferred,
  selectedFile,
  handleUploadCancel,
  onSelectImageToUpload,
  mixDescription,
  setMixDescription,
  mixImage,
  publishMix,
  isPublishing,
  audioDownloadURL,
  setMixGenres,
}) => {
  return (
    <Flex width="100%" flexDirection="column" p={12}>
      <form onSubmit={publishMix}>
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
            isDisabled={!audioDownloadURL}
            isLoading={isPublishing}
            size="lg"
            backgroundColor="blue.500"
            color="whiteAlpha.900"
            _hover={{ bg: "blue.600" }}
            type="submit"
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
          <UploadMixImage
            onSelectImageToUpload={onSelectImageToUpload}
            mixImage={mixImage}
          />
          <MixTagsAndDescription
            mixDescription={mixDescription}
            setMixDescription={setMixDescription}
            setMixGenres={setMixGenres}
          />
        </Flex>
      </form>
    </Flex>
  );
};
export default UploadSecondPage;
