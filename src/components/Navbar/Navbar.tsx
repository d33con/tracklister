import React from "react";
import { Menu, Container } from "semantic-ui-react";
import SearchInput from "./SearchInput";
import Authentication from "./Authentication";

const Navbar: React.FC = () => {
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
            <Authentication />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Navbar;
