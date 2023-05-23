import React from "react";
import { Container, Header, Form, Icon } from "semantic-ui-react";

type EditTrackProps = {};

const EditTrack: React.FC<EditTrackProps> = () => {
  return (
    <Container>
      <Header as="h1" inverted>
        Edit Track at {convertTimeToString(trackTime)}
      </Header>
      <Form size="large" inverted>
        <Form.Group inline>
          <label>Time: </label>
          <TimeInput label="Mins" value={minutes} />
          <div className="editform-timebuttons">
            <Icon
              name="plus square outline"
              size="large"
              onClick={this.handleMinutesIncrease}
            />
            <Icon
              name="minus square outline"
              size="large"
              onClick={this.handleMinutesDecrease}
            />
          </div>
          <TimeInput label="Secs" value={seconds} />
          <div className="editform-timebuttons">
            <Icon
              name="plus square outline"
              size="large"
              onClick={this.handleSecondsIncrease}
            />
            <Icon
              name="minus square outline"
              size="large"
              onClick={this.handleSecondsDecrease}
            />
          </div>
        </Form.Group>
        <TextInput
          label="Title"
          value={trackTitle}
          name="trackTitle"
          onChange={this.handleInputChange}
        />
        <TextInput
          label="Label"
          value={trackLabel}
          name="trackLabel"
          onChange={this.handleInputChange}
        />
        <TextInput
          label="Track Link"
          value={trackUrl}
          name="trackUrl"
          onChange={this.handleInputChange}
        />
        <Form.Button color="green" size="large" onClick={this.handleFormSubmit}>
          Save
        </Form.Button>
      </Form>
    </Container>
  );
};
export default EditTrack;
