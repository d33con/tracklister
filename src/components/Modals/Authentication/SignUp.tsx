import { authModalState } from "@/atoms/authModalAtom";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Button, Form, Grid, Header } from "semantic-ui-react";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { email, password, passwordConfirmation } = signUpForm;

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
            <Form.Group>
              <Form.Button secondary content="Sign Up" />
            </Form.Group>
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
