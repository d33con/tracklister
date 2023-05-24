import React from "react";
import {
  Container,
  Card,
  Button,
  Image,
  CardBody,
  CardHeader,
  Badge,
} from "@chakra-ui/react";

const LoggedOutHomepage: React.FC = () => {
  return (
    <section>
      <Container>
        <Card>
          <CardHeader textAlign="center">
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              alt="username"
              boxSize="50px"
              borderRadius="full"
            />
          </CardHeader>
          <CardHeader textAlign="center">Matthew</CardHeader>
          <CardHeader textAlign="center">2,015 followers</CardHeader>
          <CardBody textAlign="center">
            <Badge variant="outline">DnB</Badge>
            <Badge variant="outline">Oldskool</Badge>
            <Badge variant="outline">Techno</Badge>
          </CardBody>
          <CardBody textAlign="center">
            <Button as="a">View Creator</Button>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
};

export default LoggedOutHomepage;
