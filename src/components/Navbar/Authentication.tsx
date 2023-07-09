import { User } from "firebase/auth";
import React from "react";
import AuthModal from "../Modals/Authentication/AuthModal";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

type AuthenticationProps = {
  user: User | null | undefined;
};

const Authentication: React.FC<AuthenticationProps> = ({ user }) => {
  return (
    <>
      {user ? <UserMenu /> : <AuthButtons />}
      <AuthModal />
    </>
  );
};

export default Authentication;
