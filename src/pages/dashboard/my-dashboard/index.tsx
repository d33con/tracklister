import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

type MyDashboardProps = {};

const MyDashboard: React.FC<MyDashboardProps> = () => {
  const router = useRouter();

  const handleUploadButtonClick = () => {
    router.push("/upload");
  };

  return (
    <DashboardLayout>
      <Heading textAlign="left" mb={6}>
        Dashboard
      </Heading>
      <Box>
        <Button
          height="100px"
          width="300px"
          backgroundColor="blue.500"
          _hover={{ backgroundColor: "blue.600" }}
          color="whiteAlpha.900"
          onClick={handleUploadButtonClick}
          fontSize="20px"
          textTransform="uppercase"
          leftIcon={<BsPlusCircle size="20px" />}
        >
          Upload
        </Button>
      </Box>
    </DashboardLayout>
  );
};
export default MyDashboard;
