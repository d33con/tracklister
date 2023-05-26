import DashboardMain from "@/components/Dashboard/DashboardMain";
import DashboardMenu from "@/components/Dashboard/DashboardMenu";
import { HStack } from "@chakra-ui/react";
import React from "react";

type MyDashboardProps = {};

const MyDashboard: React.FC<MyDashboardProps> = () => {
  return (
    <HStack spacing={8} pt={8} pb={8}>
      <DashboardMenu />
      <DashboardMain />
    </HStack>
  );
};
export default MyDashboard;
