import { discogsModalState } from "@/atoms/discogsModalAtom";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import React from "react";
import { v4 } from "uuid";

type ReleaseDetailProps = {
  addDiscogsDetailsToTracklist: (artists: string, track: string) => void;
};

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({
  addDiscogsDetailsToTracklist,
}) => {
  const { individualTrackDetails } = useAtomValue(discogsModalState);

  return (
    <Flex direction="column" key={v4()}>
      {individualTrackDetails?.tracklist.map((track) => {
        const singleArtist = individualTrackDetails?.artists[0].name;
        const artists =
          individualTrackDetails?.artists &&
          individualTrackDetails.artists.length > 1
            ? individualTrackDetails.artists.map((artist) => {
                return artist.join.length > 0
                  ? `${artist.name} ${artist.join} `
                  : `${artist.name}`;
              })
            : singleArtist;
        return (
          <Flex direction="row" key={track.position} mb={2}>
            <Box mr={4}>
              {track.position} . {artists} - {track.title}
            </Box>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="green"
              variant="outline"
              aria-label="Add this track"
              size="sm"
              onClick={() =>
                addDiscogsDetailsToTracklist(artists as string, track.title)
              }
            >
              Add
            </Button>
          </Flex>
        );
      })}
    </Flex>
  );
};
export default ReleaseDetail;
