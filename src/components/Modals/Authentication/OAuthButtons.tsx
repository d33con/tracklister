import { auth, firestore } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { LockIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCredentials, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    //redirect to add creatorName
  };

  useEffect(() => {
    if (userCredentials) {
      createUserDocument(userCredentials.user);
    }
  }, [userCredentials]);

  return (
    <Flex justify="center" flexDir="column">
      <Button
        isLoading={loading}
        textTransform="uppercase"
        onClick={() => signInWithGoogle()}
      >
        <Icon as={FaGoogle} mr={2} />
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
