import React from "react";
import { Button, Icon, Message, Segment } from "semantic-ui-react";
import { auth } from "@/firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Segment className="flex justify-content-center">
      <Button basic loading={loading} onClick={() => signInWithGoogle()}>
        <Icon name="google" />
        Continue with Google
      </Button>
      {error && (
        <Message error header="Sign Up Error" content={error.message} />
      )}
    </Segment>
  );
};
export default OAuthButtons;
