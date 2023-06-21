import { LoggedInUser } from "@/atoms/userAtom";
import React from "react";
import AuthModal from "../Modals/Authentication/AuthModal";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

type AuthenticationProps = {
  user?: LoggedInUser;
};

const Authentication: React.FC<AuthenticationProps> = ({ user }) => {
  return (
    <>
      {user ? <UserMenu user={user} /> : <AuthButtons />}
      <AuthModal />
    </>
  );
};

export default Authentication;
