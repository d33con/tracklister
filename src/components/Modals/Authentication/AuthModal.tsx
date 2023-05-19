import React, { useEffect } from "react";
import { Header, Modal } from "semantic-ui-react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleModalClose = () => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) handleModalClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
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
        {modalState.view === "login" || modalState.view === "signup" ? (
          <>
            <OAuthButtons />
            <AuthInputs />
          </>
        ) : (
          <ResetPassword />
        )}
      </Modal.Content>
    </Modal>
  );
};

export default AuthModal;
