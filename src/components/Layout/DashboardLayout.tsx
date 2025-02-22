import DashboardMenu from "@/components/Dashboard/DashboardMenu";
import { Flex, HStack } from "@chakra-ui/react";
import HeadMetatags from "./HeadMetatags";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HStack spacing={6} py={8} px={48} align="start">
      <HeadMetatags title="Dashboard" />
      <DashboardMenu />
      <Flex direction="column" m={10} p={10} width="100%">
        {children}
      </Flex>
    </HStack>
  );
};
export default DashboardLayout;
