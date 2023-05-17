import React, { useState } from "react";
import { Form } from "semantic-ui-react";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
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

  function handleSubmit() {
    return null;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          value={email}
          type="email"
          onChange={handleChange}
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
        />
      </Form.Group>
      <Form.Button content="Submit" />
    </Form>
  );
};

export default Login;
