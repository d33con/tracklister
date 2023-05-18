import React from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);

  return (
    <>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </>
  );
};
export default AuthInputs;
