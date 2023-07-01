import { authModalState } from "@/atoms/authModalAtom";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

const LoggedOutUploadPage = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex flexDirection="column" bg="blue.400" py={12}>
      <Center>
        <Box width="33%">
          <Heading textAlign="center" color="whiteAlpha.900" mb={12}>
            Upload
          </Heading>
          <Heading
            textAlign="center"
            size="2xl"
            color="pink.200"
            textTransform="uppercase"
            mb={12}
          >
            Join our global community for audio culture
          </Heading>
          <Text textAlign="center" color="whiteAlpha.900" mb={12}>
            Tracklister is the platform for uniting people around audio culture.
            This is where people come to listen deeply across every genre, taste
            and scene.
          </Text>
          <Center>
            <Button
              size="md"
              color="blackAlpha.800"
              backgroundColor="pink.200"
              _hover={{ backgroundColor: "pink.300" }}
              variant="solid"
              onClick={() => setAuthModalState({ open: true, view: "login" })}
              textTransform="uppercase"
            >
              Upload now
            </Button>
          </Center>
        </Box>
      </Center>
    </Flex>
  );
};
export default LoggedOutUploadPage;
