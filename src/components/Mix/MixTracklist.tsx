import { mixState } from "@/atoms/mixesAtom";
import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";

const MixTracklist = () => {
  const { selectedMix } = useAtomValue(mixState);

  return (
    <>
      <Heading mb={8}>Tracklist</Heading>
      {selectedMix?.tracklist?.length ? (
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
              {selectedMix.tracklist?.map((track) => {
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
