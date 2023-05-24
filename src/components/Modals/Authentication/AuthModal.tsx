import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";
import { Modal, ModalContent, Text } from "@chakra-ui/react";

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
    <Modal onClose={handleModalClose} isOpen={modalState.open} size="sm">
      <Text textAlign="center">
        {modalState.view === "login" && "Log In"}
        {modalState.view === "signup" && "Sign Up"}
        {modalState.view === "resetPassword" && "Reset Password"}
      </Text>
      <ModalContent>
        {modalState.view === "login" || modalState.view === "signup" ? (
          <>
            <OAuthButtons />
            <AuthInputs />
          </>
        ) : (
          <ResetPassword />
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
