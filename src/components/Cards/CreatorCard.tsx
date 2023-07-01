import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const CreatorCard = () => {
  return (
    <Card maxW="sm" p={6}>
      <CardHeader textAlign="center" mb={4}>
        <Avatar src="/headshot.png" size="xl" />
      </CardHeader>
      <CardBody>
        <Heading size="lg" textAlign="center" mb={4}>
          Matthew
        </Heading>
        <Text textAlign="center" mb={3}>
          2,015 followers
        </Text>
        <Flex justifyContent="center" mb={4}>
          <Badge variant="outline" mr={2} colorScheme="gray">
            DnB
          </Badge>
          <Badge variant="outline" mr={2} colorScheme="gray">
            Oldskool
          </Badge>
          <Badge variant="outline" colorScheme="gray">
            Techno
          </Badge>
        </Flex>
      </CardBody>
      <CardFooter justify="center">
        <Button
          as="a"
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
