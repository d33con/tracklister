import React from "react";
import { Button, Card, Container, Image, Label } from "semantic-ui-react";
import styles from "@/styles/LoggedOutHomepage.module.css";

const LoggedOutHomepage: React.FC = () => {
  return (
    <section>
      <Container fluid className={styles.creatorCarousel}>
        <Card.Group className="flex justify-content-center">
          <Card className={styles.creatorCard}>
            <Card.Content>
              <Card.Header textAlign="center">
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  alt="username"
                  size="tiny"
                  circular
                />
              </Card.Header>
              <Card.Header textAlign="center">Matthew</Card.Header>
              <Card.Meta textAlign="center">2,015 followers</Card.Meta>
              <Card.Description textAlign="center">
                <Label basic>DnB</Label>
                <Label basic>Oldskool</Label>
                <Label basic>Techno</Label>
              </Card.Description>
              <Card.Description textAlign="center">
                <Button primary as="a">
                  View Creator
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={styles.creatorCard}>
            <Card.Content>
              <Card.Header textAlign="center">
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  alt="username"
                  size="tiny"
                  circular
                />
              </Card.Header>
              <Card.Header textAlign="center">Matthew</Card.Header>
              <Card.Meta textAlign="center">2,015 followers</Card.Meta>
              <Card.Description textAlign="center">
                <Label basic>DnB</Label>
                <Label basic>Oldskool</Label>
                <Label basic>Techno</Label>
              </Card.Description>
              <Card.Description textAlign="center">
                <Button primary as="a">
                  View Creator
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className={styles.creatorCard}>
            <Card.Content>
              <Card.Header textAlign="center">
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  alt="username"
                  size="tiny"
                  circular
                />
              </Card.Header>
              <Card.Header as="h2" textAlign="center">
                Matthew
              </Card.Header>
              <Card.Meta textAlign="center">2,015 followers</Card.Meta>
              <Card.Description textAlign="center">
                <Label basic>DnB</Label>
                <Label basic>Oldskool</Label>
                <Label basic>Techno</Label>
              </Card.Description>
              <Card.Description textAlign="center">
                <Button primary as="a">
                  View Creator
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    </section>
  );
};

export default LoggedOutHomepage;
