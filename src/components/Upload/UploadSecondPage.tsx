import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
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
import { MultiValue } from "react-select/dist/declarations/src/types";
import MixTagsAndDescription from "./MixTagsAndDescription";
import UploadMixImage from "./UploadMixImage";
import TracklistTable from "./TracklistTable";
import DiscogsModal from "../Modals/Discogs/DiscogsModal";
import { Tracklist } from "@/atoms/mixesAtom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";

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
  const [tracklist, setTracklist] = useState<Tracklist>([
    {
      id: uuidv4(),
      trackTime: 0,
      trackName: "",
      label: "",
    },
  ]);

  const addNewTrackRow = () => {
    setTracklist((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        trackTime: 0,
        trackName: "",
        label: "",
      },
    ]);
  };

  const deleteTrack = (id: string) => {
    setTracklist((prevState) => prevState.filter((track) => track.id !== id));
  };

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
        <Flex pt={8} pb={8} width="100%">
          <Accordion width="100%" allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading>Tracklist</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TracklistTable
                  tracklist={tracklist}
                  deleteTrack={deleteTrack}
                />
                <Center mt={8} mb={6}>
                  <Button
                    leftIcon={<PlusSquareIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={addNewTrackRow}
                  >
                    Add new track row
                  </Button>
                </Center>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <DiscogsModal />
        </Flex>
      </form>
    </Flex>
  );
};
export default UploadSecondPage;
