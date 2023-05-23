import React, { useState } from "react";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";

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
      <Grid.Row>
        <Grid.Column className="flex justify-content-center">
          <Form onSubmit={handleSubmit} loading={loading} error>
            <Form.Group className="justify-content-center">
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                value={email}
                type="email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="justify-content-center">
              <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                value={password}
                type="password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="justify-content-center">
              <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="justify-content-center">
              <Form.Button
                secondary
                content="Sign Up"
                loading={loading}
                disabled={
                  email.length === 0 ||
                  password.length === 0 ||
                  passwordConfirmation.length === 0
                }
              />
            </Form.Group>
            {(error || userCreationError) && (
              <Message
                error
                header="Sign Up Error"
                content={
                  error ||
                  FIREBASE_ERRORS[
                    userCreationError?.message as keyof typeof FIREBASE_ERRORS
                  ]
                }
              />
            )}
          </Form>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Header>Already have an account?</Header>
          <Button primary onClick={handleFormSwitch}>
            Log In
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SignUp;
