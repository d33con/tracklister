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

type UploadSecondPageProps = {
  uploadProgress: number;
  selectedFile: File | undefined;
  handleUploadCancel: () => void;
};

const UploadSecondPage: React.FC<UploadSecondPageProps> = ({
  uploadProgress,
  selectedFile,
  handleUploadCancel,
}) => {
  return (
    <Flex w="100%" flexDirection="column" bgColor="whiteAlpha.900" p={6}>
      <HStack mb={4}>
        <Heading textAlign="left">Upload</Heading>
        <Spacer />
        <Button onClick={handleUploadCancel}>Cancel</Button>
        <Button isDisabled={true}>Publish</Button>
      </HStack>
      <Stack w="100%" mb={4}>
        <Box width="100%">
          <Progress value={50} size="lg" colorScheme="blue.500" />
        </Box>
      </Stack>
      <HStack>
        <Text>{selectedFile?.name}</Text>
        <Text>{uploadProgress}%</Text>
      </HStack>
    </Flex>
  );
};
export default UploadSecondPage;
