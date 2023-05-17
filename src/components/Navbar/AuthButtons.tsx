import React from "react";
import { Button } from "semantic-ui-react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

const AuthButtons = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        primary
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        secondary
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
