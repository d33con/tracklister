import { discogsModalState } from "@/atoms/discogsModalAtom";
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
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type DiscogsMasterSearchResult = {
  id: number;
  title: string;
  thumb: string;
  uri: string;
  label: Array<string>;
  format: Array<string>;
};

const DiscogsModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(discogsModalState);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [detailShown, setDetailShown] = useState(false);
  const [resultDetail, setResultDetail] = useState({});
  const [loadingDetailId, setLoadingDetailId] = useState<number | null>(null);

  const handleModalClose = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, [setModalState]);

  const handleMoreDetailsClick = async (releaseId: number) => {
    if (releaseId !== resultDetail.id) {
      await getReleaseDetails(releaseId);
    } else {
      setDetailShown(false);
      setResultDetail({});
    }
  };

  const getReleaseDetails = async (releaseId: number) => {
    try {
      setLoadingDetailId(releaseId);
      const response = await axios.get(
        "https://api.discogs.com/masters/" + releaseId,
        {
          params: {
            token: process.env.NEXT_PUBLIC_DISCOGS_TOKEN,
          },
        }
      );
      setResultDetail(response.data);
      setDetailShown(true);
      setLoadingDetailId(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
        (obj: DiscogsMasterSearchResult) => obj
      );
      setSearchResults(results);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    searchValue.length > 3 && getSearchSuggestions(searchValue);
  }, [searchValue]);

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
              value={searchValue}
              onChange={(evt) => setSearchValue(evt.target.value)}
              autoFocus
            />
            <InputRightElement>
              <SearchIcon color="blackAlpha.900" />
            </InputRightElement>
          </InputGroup>
          <Box position="relative" padding="10">
            <Divider />
            <AbsoluteCenter bg="white" px="4">
              {searchValue.length > 3 && searchResults
                ? `Results`
                : `No results`}
            </AbsoluteCenter>
          </Box>
          <Flex direction="column">
            {searchResults.map((result: DiscogsMasterSearchResult) => (
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
                    {detailShown && result.id === resultDetail.id ? (
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
                        isLoading={loadingDetailId === result.id}
                        onClick={() => handleMoreDetailsClick(result.id)}
                      >
                        Show tracklist
                      </Button>
                    )}
                  </Flex>
                  <Flex direction="row" justifyContent="center">
                    {detailShown && result.id === resultDetail.id && (
                      <Box>
                        <ReleaseDetail releaseDetail={resultDetail} />
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
