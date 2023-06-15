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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const router = useRouter();
  const toast = useToast();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const showSignupForm = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "signup",
    }));
  };

  const showPasswordResetForm = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "resetPassword",
    }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await signInWithEmailAndPassword(email, password);
    toast({
      title: "Welcome back.",
      description: "You have successfully signed in.",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    router.reload;
    // eslint-disable-next-line
  }, [user]);

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <Input
            size="lg"
            placeholder="Email"
            name="email"
            value={email}
            type="email"
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            size="lg"
            placeholder="Password"
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
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
            isLoading={loading}
            isDisabled={email.length === 0 || password.length === 0}
            type="submit"
          >
            Log In
          </Button>
        </Box>
        {error && (
          <Alert status="error" textAlign="center" mt={2}>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </AlertDescription>
          </Alert>
        )}
      </form>
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
        Forgot your password?{" "}
        <Button
          variant="link"
          color="blackAlpha.800"
          fontSize="14px"
          onClick={showPasswordResetForm}
        >
          Reset it here.
        </Button>
      </Box>
    </Stack>
  );
};

export default Login;
