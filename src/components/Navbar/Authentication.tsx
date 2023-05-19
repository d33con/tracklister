import React from "react";
import AuthModal from "../Modals/Authentication/AuthModal";
import AuthButtons from "./AuthButtons";
import LogOut from "./LogOut";

type AuthenticationProps = {
  user: any;
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
