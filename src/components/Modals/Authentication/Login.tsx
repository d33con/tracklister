import React, { useState } from "react";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleFormSwitch = () => {
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

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    signInWithEmailAndPassword(email, password);
  }

  return (
    <Grid divided centered padded columns="equal">
      <Grid.Row>
        <Grid.Column className="flex flex-column justify-content-center">
          <Form onSubmit={handleSubmit} loading={loading} error>
            <Form.Group>
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
            <Form.Group>
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
            <Form.Group>
              <Form.Button primary content="Log In" loading={loading} />
            </Form.Group>
            {error && (
              <Message
                error
                header="Log In Error"
                content={
                  FIREBASE_ERRORS[
                    error?.message as keyof typeof FIREBASE_ERRORS
                  ]
                }
              />
            )}
          </Form>
          <div className="text-link" onClick={showPasswordResetForm}>
            Forgot your password?
          </div>
        </Grid.Column>
        <Grid.Column verticalAlign="middle">
          <Header>No account?</Header>
          <Button secondary onClick={handleFormSwitch}>
            Sign Up
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login;
