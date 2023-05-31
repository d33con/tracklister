import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";

type NamedAudioFileProps = {
  selectedFilename?: string;
  selectedFilesize?: string;
  onSelectFileToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  setMixTitle: (value: string) => void;
  mixTitle: string;
  handleCreateUploadedFile: (evt: React.FormEvent<HTMLFormElement>) => void;
};

const NameAudioFileCard: React.FC<NamedAudioFileProps> = ({
  selectedFilename,
  selectedFilesize,
  onSelectFileToUpload,
  setMixTitle,
  mixTitle,
  handleCreateUploadedFile,
}) => {
  const uploadFileRef = useRef<HTMLInputElement>(null);

  return (
    <Card size="lg" variant="outline" p={6}>
      <CardHeader>
        <Heading size="lg">Name your upload</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleCreateUploadedFile}>
          <FormControl>
            <Flex flexDir="row">
              <Input
                placeholder="Choose a title for your upload"
                size="lg"
                htmlSize={50}
                width="auto"
                name="uploadedFileName"
                value={mixTitle}
                type="text"
                onChange={(evt) => setMixTitle(evt.target.value)}
                required
              />
              <Box>
                <Button
                  width="100%"
                  size="lg"
                  ml={4}
                  backgroundColor="blue.500"
                  color="whiteAlpha.900"
                  _hover={{ bg: "blue.600" }}
                  textTransform="uppercase"
                  isDisabled={mixTitle.length === 0}
                  type="submit"
                >
                  Confirm name
                </Button>
              </Box>
            </Flex>
          </FormControl>
        </form>
      </CardBody>
      <CardFooter>
        <Text align="left" mr={2}>
          {selectedFilename} ({selectedFilesize})
        </Text>
        <Link
          color="blackAlpha.900"
          onClick={() => uploadFileRef.current?.click()}
          textDecoration="underline"
        >
          change file
          <input
            type="file"
            hidden
            accept="audio/*"
            ref={uploadFileRef}
            onChange={onSelectFileToUpload}
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NameAudioFileCard;
