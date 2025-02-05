import { uploadMixState } from "@/atoms/uploadMixAtom";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { useAtomValue } from "jotai";
import React from "react";
import { MultiValue } from "react-select/dist/declarations/src/types";
import DiscogsModal from "../Modals/Discogs/DiscogsModal";
import MixTagsAndDescription from "./MixTagsAndDescription";
import TracklistTable from "./TracklistTable";
import UploadMixImage from "./UploadMixImage";

type UploadSecondPageProps = {
  selectedFile: File | null;
  handleUploadCancel: () => void;
  publishMix: (evt: React.FormEvent<HTMLFormElement>) => void;
  setMixGenres: (
    newValue: MultiValue<{ value: string; label: string }>
  ) => void;
};

const UploadSecondPage: React.FC<UploadSecondPageProps> = ({
  selectedFile,
  handleUploadCancel,
  publishMix,
  setMixGenres,
}) => {
  const uploadMix = useAtomValue(uploadMixState);

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
            isDisabled={uploadMix.uploadProgress.uploadPercent === 0}
          >
            Cancel
          </Button>
          <Button
            isDisabled={!uploadMix.mix.audioURL}
            isLoading={uploadMix.isPublishing}
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
            <Progress
              value={uploadMix.uploadProgress.uploadPercent}
              size="lg"
              colorScheme="blue"
            />
          </Box>
        </Stack>
        <HStack>
          <Text>{selectedFile?.name}</Text>
          <Spacer />
          <Text>
            {uploadMix.uploadProgress.bytesTransferred ? (
              `${uploadMix.uploadProgress.bytesTransferred} of ${uploadMix.uploadProgress.totalBytes}`
            ) : (
              <Spinner />
            )}{" "}
            ({uploadMix.uploadProgress.uploadPercent}% done)
          </Text>
        </HStack>
        <Flex pt={8} pb={8}>
          <UploadMixImage />
          <MixTagsAndDescription setMixGenres={setMixGenres} />
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
                <TracklistTable />
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
