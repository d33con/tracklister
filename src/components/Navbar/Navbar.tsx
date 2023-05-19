import React, { useEffect } from "react";
import { Menu, Container } from "semantic-ui-react";
import SearchInput from "./SearchInput";
import Authentication from "./Authentication";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Container>
      <Menu secondary>
        <Menu.Item name="home" active onClick={() => null} />
        <Menu.Item name="messages" onClick={() => null} />
        <Menu.Item name="friends" onClick={() => null} />
        <Menu.Menu position="right">
          <Menu.Item>
            <SearchInput />
          </Menu.Item>
          <Menu.Item>
            <Authentication user={user} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Navbar;
