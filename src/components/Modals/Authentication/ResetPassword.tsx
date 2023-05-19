import React, { useState } from "react";
import { Form, Header, Message } from "semantic-ui-react";
import { auth } from "@/firebase/clientApp";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <>
      {error && <Message error header="Email not found" />}
      {!error && success ? (
        <Message info>
          <p>Reset password email sent - please check your email</p>
        </Message>
      ) : (
        <Form onSubmit={handleSubmit} loading={sending} error>
          <Header>Enter the email you signed up with below</Header>
          <Form.Group>
            <Form.Input
              placeholder="Email"
              name="email"
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Button primary content="Reset password" loading={sending} />
          </Form.Group>
        </Form>
      )}
    </>
  );
};
export default ResetPassword;
