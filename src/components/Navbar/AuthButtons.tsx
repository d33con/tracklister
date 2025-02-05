import { authModalState } from "@/atoms/authModalAtom";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

const AuthButtons = () => {
  const setAuthModalState = useSetAtom(authModalState);

  return (
    <ButtonGroup spacing={6}>
      <Button
        variant="link"
        color="whiteAlpha.900"
        size="md"
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Login
      </Button>
      <Button
        size="md"
        color="blackAlpha.800"
        backgroundColor="pink.200"
        _hover={{ backgroundColor: "pink.300" }}
        variant="solid"
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
        textTransform="uppercase"
      >
        Join
      </Button>
    </ButtonGroup>
  );
};

export default AuthButtons;
