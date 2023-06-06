import DashboardMenu from "@/components/Dashboard/DashboardMenu";
import { Flex, HStack } from "@chakra-ui/react";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HStack spacing={8} pt={8} pb={8} align="start">
      <DashboardMenu />
      <Flex direction="column" m={10} p={10} width="100%">
        {children}
      </Flex>
    </HStack>
  );
};
export default DashboardLayout;
