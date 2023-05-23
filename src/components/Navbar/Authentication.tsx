import React from "react";
import AuthModal from "../Modals/Authentication/AuthModal";
import AuthButtons from "./AuthButtons";
import LogOut from "./LogOut";
import { User } from "firebase/auth";

type AuthenticationProps = {
  user?: User | null;
};

const Authentication: React.FC<AuthenticationProps> = ({ user }) => {
  return (
    <>
      {user ? <LogOut /> : <AuthButtons />}
      <AuthModal />
    </>
  );
};

export default Authentication;
