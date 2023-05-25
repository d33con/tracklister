import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { LockIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex justify="center" flexDir="column">
      <Button
        isLoading={loading}
        textTransform="uppercase"
        onClick={() => signInWithGoogle()}
      >
        <LockIcon mr={2} />
        Login with Google
      </Button>
      {error && (
        <Alert status="error" textAlign="center" mt={2}>
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
          </AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
export default OAuthButtons;
