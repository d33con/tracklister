import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/clientApp";
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
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignUp = () => {
  const setAuthModalState = useSetAtom(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    creatorName: "",
  });
  const [error, setError] = useState("");

  const { email, password, passwordConfirmation, creatorName } = signUpForm;

  const [
    createUserWithEmailAndPassword,
    userCredentials,
    loading,
    userCreationError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const showLoginForm = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "login",
    }));
  };

  const showPasswordResetForm = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "resetPassword",
    }));
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (error) setError("");
    if (password.length < 6) {
      setError("Password must be longer than 6 characters");
      return;
    }
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const createUserDocument = async (user: User) => {
      const creatorSlug = creatorName.replace(/\s+/g, "-").toLowerCase();
      const userDocRef = doc(firestore, "users", creatorSlug);
      await setDoc(userDocRef, {
        ...JSON.parse(JSON.stringify(user)),
        creatorName,
        creatorSlug,
      });
    };
    if (userCredentials) {
      createUserDocument(userCredentials.user);
    }
  }, [userCredentials, creatorName]);

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
            placeholder="Creator name"
            name="creatorName"
            value={creatorName}
            type="text"
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            size="lg"
            placeholder="Password (6 characters or more)"
            _placeholder={{ fontSize: "17px" }}
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <Input
            size="lg"
            placeholder="Password confirmation"
            name="passwordConfirmation"
            value={passwordConfirmation}
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
            Sign Up
          </Button>
        </Box>
        {error && (
          <Alert status="error" textAlign="center" mt={2}>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {userCreationError && (
          <Alert status="error" textAlign="center" mt={2}>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {
                FIREBASE_ERRORS[
                  userCreationError?.message as keyof typeof FIREBASE_ERRORS
                ]
              }
            </AlertDescription>
          </Alert>
        )}
      </form>
      <Box textAlign="center" fontSize="14px" pt={8}>
        Already using Tracklister?{" "}
        <Button
          variant="link"
          color="blackAlpha.800"
          fontSize="14px"
          onClick={showLoginForm}
        >
          Log in here.
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

export default SignUp;
