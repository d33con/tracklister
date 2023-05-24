import React, { useState } from "react";
import { auth } from "@/firebase/clientApp";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { Button, FormControl, Input, Text } from "@chakra-ui/react";

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
      {error && <Text>Email not found</Text>}
      {!error && success ? (
        <Text>
          <p>Reset password email sent - please check your email</p>
        </Text>
      ) : (
        <form onSubmit={handleSubmit}>
          <Text textAlign="center">
            Enter the email you signed up with below
          </Text>
          <FormControl className="justify-content-center">
            <Input
              placeholder="Email"
              name="email"
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
              required
            />
          </FormControl>
          <FormControl className="justify-content-center">
            <Button isLoading={sending} disabled={email.length === 0}>
              Reset password
            </Button>
          </FormControl>
        </form>
      )}
    </>
  );
};
export default ResetPassword;
