import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const showLoginForm = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "login",
    }));
  };

  const showSignupForm = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "signup",
    }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <>
      {!error && success ? (
        <Alert status="info">
          <AlertIcon />
          Reset password email sent - please check your email
        </Alert>
      ) : (
        <form onSubmit={handleSubmit}>
          <Text textAlign="center" fontSize="14px" mb={4}>
            If you have forgotten your password, enter your e-mail address below
            and we&apos;ll email you a link to reset your password.
          </Text>
          <FormControl mb={4}>
            <Input
              placeholder="Email"
              name="email"
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
              required
            />
          </FormControl>
          <Box textAlign="center">
            <Button
              width="100%"
              backgroundColor="blackAlpha.800"
              color="whiteAlpha.900"
              _hover={{ bg: "blackAlpha.900" }}
              textTransform="uppercase"
              isLoading={sending}
              isDisabled={email.length === 0}
              type="submit"
            >
              Reset Password
            </Button>
          </Box>
          {error && (
            <Alert status="error" textAlign="center" mt={2}>
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {
                  FIREBASE_ERRORS[
                    error?.message as keyof typeof FIREBASE_ERRORS
                  ]
                }
              </AlertDescription>
            </Alert>
          )}
        </form>
      )}
      <Box textAlign="center" fontSize="14px" pt={8}>
        New to Tracklister? You can{" "}
        <Button
          variant="link"
          color="blackAlpha.800"
          fontSize="14px"
          onClick={showSignupForm}
        >
          sign up here.
        </Button>
      </Box>
      <Box textAlign="center" fontSize="14px">
        Otherwise{" "}
        <Button
          variant="link"
          color="blackAlpha.800"
          fontSize="14px"
          onClick={showLoginForm}
        >
          Log in here.
        </Button>
      </Box>
    </>
  );
};
export default ResetPassword;
