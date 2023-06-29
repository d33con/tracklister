import { MixGenre } from "@/atoms/mixGenresAtom";
import GenreMixes from "@/components/Discover/GenreMixes";
import NotFound from "@/components/Discover/NotFound";
import { firestore } from "@/firebase/clientApp";
import { Flex, Heading } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";

type GenrePageProps = {
  mixGenre: MixGenre;
};

const GenrePage: React.FC<GenrePageProps> = ({ mixGenre }) => {
  return (
    <Flex p={24} direction="column">
      <Flex direction="row" width="50%" justifyContent="center" mx="auto">
        <Heading mb={8} textAlign="center" size="xl">
          Listen to {mixGenre.displayName} shows
        </Heading>
        {!mixGenre ? <NotFound /> : <GenreMixes mixGenre={mixGenre} />}
      </Flex>
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
