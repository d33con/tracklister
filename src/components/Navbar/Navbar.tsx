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
      <Menu text>
        <Menu.Item name="Tracklister" header onClick={() => null} />
        <Menu.Item>
          <SearchInput />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="Categories" onClick={() => null} />
          <Menu.Item name="Upload" onClick={() => null} />
          <Menu.Item>
            <Authentication user={user} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Navbar;
