import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";

type SelectFileToUploadCardProps = {
  onSelectFileToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFileLoading?: boolean;
};

const SelectFileToUploadCard: React.FC<SelectFileToUploadCardProps> = ({
  onSelectFileToUpload,
  selectedFileLoading,
}) => {
  const uploadFileRef = useRef<HTMLInputElement>(null);

  return (
    <Card size="sm" variant="outline" p={6}>
      <CardHeader>
        <Heading size="xl">Shows</Heading>
      </CardHeader>
      <CardBody>
        <Text textAlign="center" mb={6} color="blackAlpha.700">
          Upload mixes, shows or podcasts
        </Text>
      </CardBody>
      <CardFooter justify="center">
        <Button
          backgroundColor="blue.500"
          color="whiteAlpha.900"
          _hover={{ bg: "blue.600" }}
          textTransform="uppercase"
          size="lg"
          width="100%"
          onClick={() => uploadFileRef.current?.click()}
          isLoading={selectedFileLoading}
        >
          Upload
        </Button>
        <input
          type="file"
          hidden
          accept="audio/*"
          ref={uploadFileRef}
          onChange={onSelectFileToUpload}
        />
      </CardFooter>
    </Card>
  );
};

export default SelectFileToUploadCard;
