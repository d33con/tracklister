import { MixGenre } from "@/atoms/mixGenresAtom";
import GenreMixes from "@/components/Discover/GenreMixes";
import NotFound from "@/components/Discover/NotFound";
import { firestore } from "@/firebase/clientApp";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";

type GenrePageProps = {
  mixGenre: MixGenre;
};

const GenrePage: React.FC<GenrePageProps> = ({ mixGenre }) => {
  return (
    <Flex direction="column">
      <Heading
        py={12}
        textAlign="center"
        size="xl"
        bg="blue.900"
        color="whiteAlpha.900"
      >
        Listen to {mixGenre.label} shows
      </Heading>
      <Center>
        <Box width="66%">
          {!mixGenre ? <NotFound /> : <GenreMixes mixGenre={mixGenre} />}
        </Box>
      </Center>
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const genreDocRef = doc(
      firestore,
      "mixGenres",
      context.query.genreName as string
    );
    const genreDoc = await getDoc(genreDocRef);

    return {
      props: {
        mixGenre: genreDoc.exists() ? { ...genreDoc.data() } : "",
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default GenrePage;
