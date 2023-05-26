import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleModalClose = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, [setModalState]);

  useEffect(() => {
    if (user) handleModalClose();
  }, [handleModalClose, user]);

  return (
    <Modal onClose={handleModalClose} isOpen={modalState.open} size="sm">
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalCloseButton />
        <ModalHeader textAlign="center" textTransform="uppercase">
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalBody>
          {modalState.view === "login" || modalState.view === "signup" ? (
            <>
              <OAuthButtons />
              <Text textAlign="center" textTransform="uppercase" mt={2} mb={2}>
                or
              </Text>
              <AuthInputs />
            </>
          ) : (
            <ResetPassword />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
