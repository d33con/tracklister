import { MixGenre } from "@/atoms/mixGenresAtom";
import { firestore } from "@/firebase/clientApp";
import { colors } from "@/helpers/chakraColors";
import { Button, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const DiscoverIndex = () => {
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
  }, []);

  return (
    <Flex direction="column">
      <Heading bg="blue.900" color="pink.200" textAlign="center" py={12}>
        Discover audio culture
      </Heading>
      <Flex
        direction="column"
        width="75%"
        justifyContent="center"
        mx="auto"
        mb={12}
      >
        <Heading color="blackAlpha.900" textAlign="center" py={12}>
          Discover music shows
        </Heading>
        <Wrap spacingX="40px" spacingY="50px" justify="center">
          {mixGenres.map((genre: MixGenre, idx: number) => (
            <WrapItem key={genre.label}>
              <Button
                as={NextLink}
                href={`/discover/${genre.value}`}
                width="225px"
                height="130px"
                backgroundColor={`${colors[idx]}.800`}
                _hover={{ backgroundColor: `${colors[idx]}.900` }}
                color={`${colors[idx - 1]}.200`}
                fontSize="20px"
                textTransform="uppercase"
              >
                {genre.label}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Flex>
    </Flex>
  );
};
export default DiscoverIndex;
