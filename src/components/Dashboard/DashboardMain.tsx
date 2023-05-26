import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

type DashboardMainProps = {};

const DashboardMain: React.FC<DashboardMainProps> = () => {
  const router = useRouter();

  const handleUploadButtonClick = () => {
    router.push("/upload");
  };

  return (
    <Box>
      <Heading textAlign="left" mb={6}>
        Dashboard
      </Heading>
      <Box>
        <Button
          size="md"
          height="100px"
          width="300px"
          backgroundColor="blue.500"
          _hover={{ backgroundColor: "blue.600" }}
          color="whiteAlpha.900"
          onClick={handleUploadButtonClick}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
};
export default DashboardMain;
