import React from "react";
import { Button } from "semantic-ui-react";
import { auth } from "@/firebase/clientApp";
import { useSignOut } from "react-firebase-hooks/auth";

const LogOut: React.FC = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Button primary onClick={handleSignOut} loading={loading}>
        Log Out
      </Button>
    </>
  );
};
export default LogOut;
