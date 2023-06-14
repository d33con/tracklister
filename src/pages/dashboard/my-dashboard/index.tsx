import { Box, Button, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsPlusCircle } from "react-icons/bs";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const MyDashboard = () => {
  return (
    <DashboardLayout>
      <Heading textAlign="left" mb={6}>
        Dashboard
      </Heading>
      <Box>
        <Link as={NextLink} href="/upload">
          <Button
            height="100px"
            width="300px"
            backgroundColor="blue.500"
            _hover={{ backgroundColor: "blue.600" }}
            color="whiteAlpha.900"
            fontSize="20px"
            textTransform="uppercase"
            leftIcon={<BsPlusCircle size="20px" />}
          >
            Upload
          </Button>
        </Link>
      </Box>
    </DashboardLayout>
  );
};
export default MyDashboard;
