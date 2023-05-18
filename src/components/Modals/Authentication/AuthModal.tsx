import React from "react";
import { Header, Modal } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleModalClose = () => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <>
      <Modal
        closeIcon
        onClose={handleModalClose}
        open={modalState.open}
        size="small"
      >
        <Header textAlign="center">
          {modalState.view === "login" && "Log In"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </Header>
        <Modal.Content>
          <OAuthButtons />
          <AuthInputs />
          {/* <ResetPassword /> */}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AuthModal;
