import React from "react";
import { Table, Icon, Button, Dimmer } from "semantic-ui-react";
import EditTrack from "../AudioPlayer/EditTrack";

type TracklistTableProps = {};

const TracklistTable: React.FC<TracklistTableProps> = () => {
  const tableRows = [].map((track) => {
    const { releaseId, trackTitle, trackTime, trackLabel, trackUrl } = track;
    return (
      <Table.Row key={releaseId}>
        <Table.Cell>track time</Table.Cell>
        <Table.Cell>
          <a href={trackUrl}>{trackTitle}</a>
        </Table.Cell>
        <Table.Cell>{trackLabel}</Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <Icon name="edit" link size="large" onClick={() => {}} />
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <Icon
            name="delete"
            link
            color="red"
            size="large"
            onClick={() => {}}
          />
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Dimmer.Dimmable dimmed={false}>
      <Dimmer page active={false} onClickOutside={() => {}}>
        <EditTrack track={""} updateTrack={() => {}} />
      </Dimmer>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Time</Table.HeaderCell>
            <Table.HeaderCell>Track Name</Table.HeaderCell>
            <Table.HeaderCell>Label</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tableRows}</Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Button
                floated="right"
                size="large"
                color="blue"
                inverted
                animated="fade"
                onClick={() => {}}
              >
                <Button.Content hidden>Export</Button.Content>
                <Button.Content visible>
                  <Icon name="file outline" />
                </Button.Content>
              </Button>
              <Button
                size="large"
                color="blue"
                inverted
                animated="fade"
                onClick={() => {}}
              >
                <Button.Content hidden>Add Row</Button.Content>
                <Button.Content visible>
                  <Icon name="add circle" />
                </Button.Content>
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Dimmer.Dimmable>
  );
};
export default TracklistTable;
