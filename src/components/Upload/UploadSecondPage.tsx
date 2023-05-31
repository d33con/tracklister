import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type UploadSecondPageProps = {
  uploadProgress: number;
  selectedFile: File | undefined;
};

const UploadSecondPage: React.FC<UploadSecondPageProps> = ({
  uploadProgress,
  selectedFile,
}) => {
  return (
    <Flex>
      <Text>{uploadProgress}%</Text>
      <Text>{selectedFile?.name}</Text>
    </Flex>
  );
};
export default UploadSecondPage;
