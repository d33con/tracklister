import { authModalState } from "@/atoms/authModalAtom";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, Form, Grid, Header } from "semantic-ui-react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginForm;

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

  function handleSubmit() {
    return null;
  }

  return (
    <Grid divided centered padded columns="equal">
      <Grid.Row>
        <Grid.Column className="flex justify-content-center">
          <Form onSubmit={handleSubmit}>
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
              <Form.Button primary content="Log In" />
            </Form.Group>
          </Form>
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
