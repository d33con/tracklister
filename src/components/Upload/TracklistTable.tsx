import { discogsModalState } from "@/atoms/discogsModalAtom";
import { tracklistState } from "@/atoms/tracklistAtom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
import { SiDiscogs } from "react-icons/si";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const TracklistTable = () => {
  const setModalState = useSetRecoilState(discogsModalState);
  const [tracklist, setTracklist] = useRecoilState(tracklistState);

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setTracklist((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              [evt.target.name]: evt.target.value,
            }
          : item
      )
    );
  };

  const addNewTrackRow = () => {
    let lastTrackTime = 0;
    if (tracklist.length > 0) {
      lastTrackTime = tracklist.at(-1)!.trackTime;
    }
    setTracklist((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        trackTime: lastTrackTime,
        trackName: "",
        label: "",
      },
    ]);
  };

  const deleteTrack = (id: string) => {
    setTracklist((prevState) => prevState.filter((track) => track.id !== id));
  };

  const handleMinutesIncrease = (id: string) => {
    setTracklist((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              trackTime: item.trackTime + 60,
            }
          : item
      )
    );
  };

  const handleMinutesDecrease = (id: string) => {
    setTracklist((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              trackTime: item.trackTime - 60,
            }
          : item
      )
    );
  };

  const handleSecondsIncrease = (id: string) => {
    setTracklist((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              trackTime: item.trackTime + 1,
            }
          : item
      )
    );
  };

  const handleSecondsDecrease = (id: string) => {
    setTracklist((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? {
              ...item,
              trackTime: item.trackTime - 1,
            }
          : item
      )
    );
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Track</Th>
              <Th>Label</Th>
              <Th>Add using Discogs</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tracklist.map((track) => {
              const minutes = Math.floor(track.trackTime / 60);
              let seconds = track.trackTime % 60;
              const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
              return (
                <Tr key={track.id}>
                  <Td>
                    <Flex direction="row">
                      <Flex direction="row" alignItems="center">
                        <VStack>
                          <IconButton
                            icon={<BsPlusCircle />}
                            colorScheme="teal"
                            variant="link"
                            aria-label="Increase minutes"
                            size="md"
                            onClick={() => handleMinutesIncrease(track.id)}
                          />
                          Mins
                          <IconButton
                            icon={<BsDashCircle />}
                            colorScheme="teal"
                            variant="link"
                            aria-label="Decrease minutes"
                            size="md"
                            onClick={() => handleMinutesDecrease(track.id)}
                          />
                        </VStack>
                        <InputGroup size="sm">
                          {/* eslint-disable-next-line react/no-children-prop */}
                          <InputLeftAddon children="mins" />
                          <Input
                            width="auto"
                            htmlSize={1}
                            type="number"
                            placeholder="mins"
                            value={minutes}
                            name="minutes"
                            isReadOnly
                          />
                        </InputGroup>
                      </Flex>
                      <Flex direction="row" alignItems="center">
                        <VStack>
                          <IconButton
                            icon={<BsPlusCircle />}
                            colorScheme="teal"
                            variant="link"
                            aria-label="Increase seconds"
                            size="md"
                            onClick={() => handleSecondsIncrease(track.id)}
                          />
                          Secs
                          <IconButton
                            icon={<BsDashCircle />}
                            colorScheme="teal"
                            variant="link"
                            aria-label="Decrease seconds"
                            size="md"
                            onClick={() => handleSecondsDecrease(track.id)}
                          />
                        </VStack>
                        <InputGroup size="sm">
                          {/* eslint-disable-next-line react/no-children-prop */}
                          <InputLeftAddon children="secs" />
                          <Input
                            width="auto"
                            htmlSize={1}
                            type="text"
                            placeholder="secs"
                            value={secondsString}
                            name="trackTime"
                            isReadOnly
                          />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    {" "}
                    <Input
                      size="lg"
                      placeholder="Artist - title"
                      name="trackName"
                      value={track.trackName}
                      type="text"
                      onChange={(evt) => handleChange(evt, track.id)}
                    />
                  </Td>
                  <Td>
                    <Input
                      size="lg"
                      placeholder="Label"
                      name="label"
                      value={track.label}
                      type="text"
                      onChange={(evt) => handleChange(evt, track.id)}
                    />
                  </Td>
                  <Td>
                    <Button
                      leftIcon={<SiDiscogs />}
                      color="blackAlpha.700"
                      variant="outline"
                      size="sm"
                      mr={2}
                      onClick={() =>
                        setModalState((prevState) => ({
                          ...prevState,
                          open: true,
                          tracklistId: track.id,
                        }))
                      }
                    >
                      Discogs
                    </Button>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label="Delete track"
                      icon={<RiDeleteBin7Line />}
                      color="red.800"
                      variant="outline"
                      size="sm"
                      mr={2}
                      onClick={() => deleteTrack(track.id)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
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
    </>
  );
};
export default TracklistTable;
