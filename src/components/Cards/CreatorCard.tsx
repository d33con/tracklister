import { Creator } from "@/atoms/mixesAtom";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { GoLocation } from "react-icons/go";

type CreatorCardProps = {
  creator: Creator;
};

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  return (
    <Card minW="sm" p={6}>
      <CardHeader textAlign="center" mb={4}>
        <Avatar src={creator.photoURL || "/headshot.png"} size="xl" />
      </CardHeader>
      <CardBody>
        <Heading size="lg" textAlign="center" mb={4}>
          {creator.creatorName}
        </Heading>
        <Flex justifyContent="center">
          <Text
            color="blue.600"
            fontSize="xl"
            textAlign="left"
            minHeight="36px"
          >
            {creator.location && (
              <>
                <Icon as={GoLocation} mr={1} boxSize="15px" />
                {creator.location}
              </>
            )}
          </Text>
        </Flex>
      </CardBody>
      <CardFooter justify="center">
        <Button
          as={NextLink}
          href={`/${creator.creatorSlug}`}
          backgroundColor="blackAlpha.800"
          color="whiteAlpha.900"
          _hover={{ bg: "blackAlpha.900" }}
          cursor="pointer"
          textTransform="uppercase"
        >
          View Creator
        </Button>
      </CardFooter>
    </Card>
  );
};
export default CreatorCard;
