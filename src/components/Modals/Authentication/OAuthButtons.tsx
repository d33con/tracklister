import React from "react";
import { auth } from "@/firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Icon } from "@chakra-ui/icons";
import { Flex, Button, Text } from "@chakra-ui/react";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex className="flex justify-content-center">
      <Button isLoading={loading} onClick={() => signInWithGoogle()}>
        <Icon name="google" />
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};
export default OAuthButtons;
