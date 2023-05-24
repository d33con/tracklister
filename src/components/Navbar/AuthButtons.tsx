import React from "react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";

const AuthButtons = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button onClick={() => setAuthModalState({ open: true, view: "login" })}>
        Log In
      </Button>
      <Button onClick={() => setAuthModalState({ open: true, view: "signup" })}>
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
