import { MixGenre } from "@/atoms/mixGenresAtom";
import { firestore } from "@/firebase/clientApp";
import { colors } from "@/helpers/chakraColors";
import { Button, Flex, Heading, Link, SimpleGrid } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

type DiscoverIndexProps = {};

const DiscoverIndex: React.FC<DiscoverIndexProps> = () => {
  const [mixGenres, setMixGenres] = useState([]);

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
    <Flex direction="column" p={16}>
      <Heading mb={12} textAlign="center" size="xl">
        Discover Music Shows
      </Heading>
      <Flex width="50%" justifyContent="center" mx="auto">
        <SimpleGrid columns={4} spacingX={8} spacingY={12}>
          {mixGenres.map((genre: MixGenre, idx: number) => (
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
    </Flex>
  );
};
export default DiscoverIndex;
