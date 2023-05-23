import { auth, firestore } from "@/firebase/clientApp";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Form, Icon, Popup } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";

type MixTitleProps = {};

const MixTitle: React.FC<MixTitleProps> = () => {
  const [mixTitle, setMixTitle] = useState("Mix title");
  const [popupState, setPopupState] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  const handleSubmit = async () => {
    setPopupState(false);
    const mixId = uuidv4();

    // create the mix and name in the database
    await setDoc(doc(firestore, "mixes", mixId), {
      userId: user?.uid,
      createdAt: serverTimestamp(),
      title: mixTitle,
    });
  };

  const handleMixTitleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setMixTitle(evt.target.value);
  };

  return (
    <div>
      {mixTitle}
      <div>
        <Popup
          trigger={<Icon link name="edit" size="small" />}
          on="click"
          position="bottom center"
          open={popupState}
          onOpen={() => setPopupState(true)}
          onClose={() => setPopupState(false)}
        >
          <Popup.Content>
            <Form onSubmit={handleSubmit}>
              <Form.Input
                placeholder="Enter title"
                autoFocus
                size="large"
                onChange={handleMixTitleChange}
                value={mixTitle}
              />
              <Button icon basic>
                <Icon name="add" circular color="teal" />
              </Button>
            </Form>
          </Popup.Content>
        </Popup>
      </div>
    </div>
  );
};
export default MixTitle;
