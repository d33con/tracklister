import { Tracklist } from "@/atoms/tracklistAtom";
import {
  TableContainer,
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
} from "@chakra-ui/react";
import React from "react";

type MixTracklistProps = {
  tracklist: Tracklist | undefined;
};

const MixTracklist: React.FC<MixTracklistProps> = ({ tracklist }) => {
  return (
    <>
      <Heading mb={8}>Tracklist</Heading>
      {tracklist?.length ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Time</Th>
                <Th>Track</Th>
                <Th>Label</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tracklist?.map((track) => {
                const minutes = Math.floor(track.trackTime / 60);
                let seconds = track.trackTime % 60;
                const secondsString =
                  seconds < 10 ? `0${seconds}` : `${seconds}`;
                return (
                  <Tr key={track.id}>
                    <Td>
                      {minutes}:{secondsString}
                    </Td>
                    <Td>{track.trackName}</Td>
                    <Td>{track.label}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text color="blackAlpha.800">No tracklist added</Text>
      )}
    </>
  );
};

export default MixTracklist;
