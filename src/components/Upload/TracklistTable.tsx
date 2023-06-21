import {
  Button,
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

import { discogsModalState } from "@/atoms/discogsModalAtom";
import { Tracklist } from "@/atoms/mixesAtom";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";
import { RiDeleteBin7Line } from "react-icons/ri";
import { SiDiscogs } from "react-icons/si";
import { useRecoilState } from "recoil";

type TracklistTableProps = {
  tracklist: Tracklist;
  deleteTrack: (id: string) => void;
};

const TracklistTable: React.FC<TracklistTableProps> = ({
  tracklist,
  deleteTrack,
}) => {
  const [modalState, setModalState] = useRecoilState(discogsModalState);

  return (
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
          {tracklist.map((track) => (
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
                      />
                      Mins
                      <IconButton
                        icon={<BsDashCircle />}
                        colorScheme="teal"
                        variant="link"
                        aria-label="Decrease minutes"
                        size="md"
                      />
                    </VStack>
                    <InputGroup size="sm">
                      {/* eslint-disable-next-line react/no-children-prop */}
                      <InputLeftAddon children="mins" />
                      <Input
                        width="auto"
                        htmlSize={3}
                        type="number"
                        placeholder="mins"
                        value={track.trackTime}
                        // onChange={handleChange}
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
                      />
                      Secs
                      <IconButton
                        icon={<BsDashCircle />}
                        colorScheme="teal"
                        variant="link"
                        aria-label="Decrease seconds"
                        size="md"
                      />
                    </VStack>
                    <InputGroup size="sm">
                      {/* eslint-disable-next-line react/no-children-prop */}
                      <InputLeftAddon children="secs" />
                      <Input
                        width="auto"
                        htmlSize={3}
                        type="number"
                        placeholder="secs"
                        value={track.trackTime}
                        // onChange={handleChange}
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
                  // onChange={handleChange}
                />
              </Td>
              <Td>
                <Input
                  size="lg"
                  placeholder="Label"
                  name="label"
                  value={track.label}
                  type="text"
                  // onChange={handleChange}
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default TracklistTable;
