import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Progress,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import MixUploadImage from "./MixUploadImage";
import MixTagsAndDescription from "./MixTagsAndDescription";

type UploadSecondPageProps = {
  uploadPercent: number;
  totalBytes: string;
  bytesTransferred: string;
  selectedFile: File | undefined;
  handleUploadCancel: () => void;
};

const UploadSecondPage: React.FC<UploadSecondPageProps> = ({
  uploadPercent,
  totalBytes,
  bytesTransferred,
  selectedFile,
  handleUploadCancel,
}) => {
  return (
    <Flex w="100%" flexDirection="column" p={12}>
      <HStack mb={6}>
        <Heading textAlign="left">Upload</Heading>
        <Spacer />
        <Button
          onClick={handleUploadCancel}
          variant="ghost"
          textTransform="uppercase"
        >
          Cancel
        </Button>
        <Button
          isDisabled={true}
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
          {bytesTransferred} of {totalBytes} ({uploadPercent}% done)
        </Text>
      </HStack>
      <HStack spacing={8} pt={8} pb={8}>
        <MixUploadImage />
        <MixTagsAndDescription />
      </HStack>
    </Flex>
  );
};
export default UploadSecondPage;
