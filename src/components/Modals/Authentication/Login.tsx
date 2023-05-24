import React, { useState } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Flex, Button, Text, FormControl, Input } from "@chakra-ui/react";

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
    <Flex>
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
          <Button
            content="Log In"
            loading={loading}
            disabled={email.length === 0 || password.length === 0}
          />
        </FormControl>
        {error && (
          <Text
            error
            header="Log In Error"
            content={
              FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]
            }
          />
        )}
      </form>
      <div className="text-link text-center" onClick={showPasswordResetForm}>
        Forgot your password?
      </div>
      <Text>No account?</Text>
      <Button onClick={handleFormSwitch}>Sign Up</Button>
    </Flex>
  );
};

export default Login;
