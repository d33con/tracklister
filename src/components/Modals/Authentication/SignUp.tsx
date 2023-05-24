import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import {
  Grid,
  FormControl,
  Input,
  Button,
  Heading,
  GridItem,
} from "@chakra-ui/react";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");

  const { email, password, passwordConfirmation } = signUpForm;

  const [createUserWithEmailAndPassword, user, loading, userCreationError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleFormSwitch = () => {
    setAuthModalState((prevState) => ({
      ...prevState,
      view: "login",
    }));
  };

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
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
  }

  return (
    <Grid divided centered padded columns="equal">
      <GridItem className="flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <FormControl className="justify-content-center">
            <Input
              label="Email"
              placeholder="Email"
              name="email"
              value={email}
              type="email"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl className="justify-content-center">
            <Input
              label="Password"
              placeholder="Password"
              name="password"
              value={password}
              type="password"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl className="justify-content-center">
            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              value={passwordConfirmation}
              type="password"
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl className="justify-content-center">
            <Button
              isLoading={loading}
              disabled={
                email.length === 0 ||
                password.length === 0 ||
                passwordConfirmation.length === 0
              }
            >
              Sign Up
            </Button>
          </FormControl>
          {(error || userCreationError) && (
            <Heading
              header=""
              content={
                error ||
                FIREBASE_ERRORS[
                  userCreationError?.message as keyof typeof FIREBASE_ERRORS
                ]
              }
            >
              Sign Up Error
            </Heading>
          )}
        </form>
      </GridItem>
      <GridItem verticalAlign="middle">
        <Heading>Already have an account?</Heading>
        <Button onClick={handleFormSwitch}>Log In</Button>
      </GridItem>
    </Grid>
  );
};

export default SignUp;
