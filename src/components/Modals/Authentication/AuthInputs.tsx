import { authModalState } from "@/atoms/authModalAtom";
import { useAtomValue } from "jotai";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthInputs = () => {
  const modalState = useAtomValue(authModalState);

  return (
    <>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <SignUp />}
    </>
  );
};
export default AuthInputs;
