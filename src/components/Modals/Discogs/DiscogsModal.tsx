import { DiscogsModalState, discogsModalState } from "@/atoms/discogsModalAtom";
import ReleaseDetail from "@/components/Upload/ReleaseDetail";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

type DiscogsModalProps = {
  sendDiscogsDetailsToTracklist: (
    artists: string | Array<string>,
    track: string
  ) => void;
};

const DiscogsModal: React.FC<DiscogsModalProps> = ({
  sendDiscogsDetailsToTracklist,
}) => {
  const [modalState, setModalState] = useRecoilState(discogsModalState);

  const handleModalClose = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, [setModalState]);

  const handleAddTrackFromModal = (track, artist) => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
    sendDiscogsDetailsToTracklist(track, artist);
  };

  const handleMoreDetailsClick = async (releaseId: number) => {
    if (releaseId !== modalState.individualTrackDetails.id) {
      await getReleaseDetails(releaseId);
    } else {
      setModalState((prevState) => ({
        ...prevState,
        loadingTrackDetail: true,
        individualTrackDetails: {
          id: null,
        },
      }));
    }
  };

  const getReleaseDetails = async (releaseId: number) => {
    try {
      setModalState((prevState) => ({
        ...prevState,
        loadingTrackDetailId: releaseId,
      }));
      const response = await axios.get(
        "https://api.discogs.com/masters/" + releaseId,
        {
          params: {
            token: process.env.NEXT_PUBLIC_DISCOGS_TOKEN,
          },
        }
      );
      setModalState((prevState) => ({
        ...prevState,
        loadingTrackDetail: true,
        loadingTrackDetailId: null,
        individualTrackDetails: response.data,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getSearchSuggestions = async (value: string) => {
      try {
        const response = await axios.get(
          "https://api.discogs.com/database/search",
          {
            params: {
              q: value,
              type: "master",
              token: process.env.NEXT_PUBLIC_DISCOGS_TOKEN,
              per_page: 10,
              page: 1,
            },
          }
        );
        const results = response.data.results.map(
          (obj: DiscogsModalState) => obj
        );
        setModalState((prevState) => ({
          ...prevState,
          results,
        }));
      } catch (error: any) {
        console.log(error.message);
      }
    };
    modalState.searchValue.length > 3 &&
      getSearchSuggestions(modalState.searchValue);
  }, [modalState.searchValue, setModalState]);

  return (
    <Modal onClose={handleModalClose} isOpen={modalState.open} size="4xl">
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalCloseButton />
        <ModalHeader textAlign="center">
          Adding track using Discogs at 00:00
        </ModalHeader>
        <ModalBody>
          <InputGroup>
            <Input
              placeholder="eg. Artist - Title or Catalogue Number"
              size="lg"
              value={modalState.searchValue}
              onChange={(evt) =>
                setModalState((prevState) => ({
                  ...prevState,
                  searchValue: evt.target.value,
                }))
              }
              autoFocus
            />
            <InputRightElement>
              <SearchIcon color="blackAlpha.900" />
            </InputRightElement>
          </InputGroup>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              {modalState.searchValue.length > 3 && modalState.results
                ? `Results`
                : `No results`}
            </AbsoluteCenter>
          </Box>
          <Flex direction="column">
            {modalState.results.map((result) => (
              <Flex direction="row" key={result.id} mb={3} width="100%">
                <Flex direction="column" width="100%">
                  <Flex
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Box mr={4}>
                      <Image
                        boxSize="50px"
                        objectFit="cover"
                        alt={result.title}
                        src={result.thumb}
                      />
                    </Box>
                    <Link
                      href={`https://www.discogs.com${result.uri}`}
                      isExternal
                    >
                      <Box>
                        {result.title}
                        <ExternalLinkIcon mx={2} />
                      </Box>
                    </Link>
                    <Spacer />
                    <Box mr={4}>
                      {result.label && result.label[0]} /{" "}
                      {result.format && result.format[0]}
                    </Box>
                    {modalState.loadingTrackDetail &&
                    result.id === modalState.individualTrackDetails.id ? (
                      <Button
                        leftIcon={<ChevronUpIcon />}
                        colorScheme="blue"
                        variant="outline"
                        aria-label="Show release details"
                        size="sm"
                        onClick={() => handleMoreDetailsClick(result.id)}
                      >
                        Hide tracklist
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<ChevronDownIcon />}
                        colorScheme="blue"
                        variant="outline"
                        aria-label="Hide release details"
                        size="sm"
                        isLoading={
                          modalState.loadingTrackDetailId === result.id
                        }
                        onClick={() => handleMoreDetailsClick(result.id)}
                      >
                        Show tracklist
                      </Button>
                    )}
                  </Flex>
                  <Flex direction="row" justifyContent="center">
                    {modalState.loadingTrackDetail &&
                      result.id === modalState.individualTrackDetails.id && (
                        <Box>
                          <ReleaseDetail
                            releaseDetail={modalState.individualTrackDetails}
                            sendDiscogsDetailsToTracklist={
                              handleAddTrackFromModal
                            }
                          />
                        </Box>
                      )}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DiscogsModal;
