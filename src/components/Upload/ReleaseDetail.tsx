import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { v4 } from "uuid";

type ReleaseDetailProps = {
  releaseDetail: object;
};

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({ releaseDetail }) => {
  return (
    <Flex direction="column" key={v4()}>
      {releaseDetail.tracklist.map((singleTrack, singleArtist) => {
        singleArtist = releaseDetail.artists[0].name;
        const artists =
          releaseDetail.artists && releaseDetail.artists.length > 1
            ? releaseDetail.artists.map((name) => {
                return name.join.length > 0
                  ? `${name.name} ${name.join} `
                  : `${name.name}`;
              })
            : singleArtist;
        return (
          <Flex direction="row" key={v4()}>
            <Box mr={4}>
              {singleTrack.position} . {artists} - {singleTrack.title}
            </Box>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="green"
              variant="outline"
              aria-label="Add this track"
              size="sm"
              // onClick={() => handleMoreDetailsClick(result.id)}
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
