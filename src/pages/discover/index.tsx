import { firestore } from "@/firebase/clientApp";
import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { MixGenre } from "@/atoms/mixGenresAtom";
import { colors } from "@/helpers/chakraColors";

type DiscoverIndexProps = {};

const DiscoverIndex: React.FC<DiscoverIndexProps> = () => {
  const [mixGenres, setMixGenres] = useState<MixGenre>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        // get all genres
        const mixGenresQuery = query(collection(firestore, "mixGenres"));

        const mixGenresDocs = await getDocs(mixGenresQuery);

        const mixGenres = mixGenresDocs.docs.map((mix) => ({ ...mix.data() }));
        setMixGenres(mixGenres as []);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getGenres();
  }, [mixGenres, setMixGenres]);

  return (
    <Flex p={24} direction="column">
      <Heading mb={8} textAlign="center">
        Discover Music Shows
      </Heading>
      <SimpleGrid columns={4} spacing={4} p={12}>
        {mixGenres.map((genre, idx: number) => (
          <Link
            as={NextLink}
            href={`/discover/${genre.name}`}
            key={genre.displayName}
          >
            <Button
              height="150px"
              width="250px"
              backgroundColor={`${colors[idx]}.700`}
              _hover={{ backgroundColor: `${colors[idx]}.900` }}
              color="whiteAlpha.900"
              fontSize="20px"
              textTransform="uppercase"
            >
              {genre.displayName}
            </Button>
          </Link>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
export default DiscoverIndex;
