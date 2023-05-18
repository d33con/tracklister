import React from "react";
import { Button, Icon, Segment } from "semantic-ui-react";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  return (
    <Segment className="flex justify-content-center">
      <Button basic>
        <Icon name="google" />
        Continue with Google
      </Button>
    </Segment>
  );
};
export default OAuthButtons;
