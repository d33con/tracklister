import { uploadMixState } from "@/atoms/uploadMixAtom";
import bytesToMB from "@/helpers/bytesToMB";
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
import { useRecoilState } from "recoil";

type NamedAudioFileProps = {
  onSelectAudioFileToUpload: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateUploadedAudioFile: (
    evt: React.FormEvent<HTMLFormElement>
  ) => void;
};

const NameAudioFileCard: React.FC<NamedAudioFileProps> = ({
  onSelectAudioFileToUpload,
  handleCreateUploadedAudioFile,
}) => {
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [uploadMix, setUploadMix] = useRecoilState(uploadMixState);

  return (
    <Card size="lg" variant="outline" p={6}>
      <CardHeader>
        <Heading size="lg">Name your upload</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleCreateUploadedAudioFile}>
          <FormControl>
            <Flex flexDir="row">
              <Input
                placeholder="Choose a title for your upload"
                size="lg"
                htmlSize={50}
                width="auto"
                name="title"
                value={uploadMix.mix.title}
                type="text"
                onChange={(evt) =>
                  setUploadMix((prevState) => ({
                    ...prevState,
                    mix: {
                      ...prevState.mix,
                      title: evt.target.value,
                    },
                  }))
                }
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
                  isDisabled={uploadMix.mix.title?.length === 0}
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
          {uploadMix.selectedAudioFile?.name} (
          {bytesToMB(uploadMix.selectedAudioFile?.size as number)})
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
            onChange={onSelectAudioFileToUpload}
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NameAudioFileCard;
