import React from "react";
import { auth } from "@/firebase/clientApp";
import { useSignOut } from "react-firebase-hooks/auth";
import { Button } from "@chakra-ui/react";

const LogOut = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <Button onClick={handleSignOut} isLoading={loading}>
        Log Out
      </Button>
    </>
  );
};
export default LogOut;
