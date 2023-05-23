import React from "react";
import { Card } from "semantic-ui-react";
import ImageSelector from "./ImageSelector";
import MixTitle from "./MixTitle";

type AudioPlayerProps = {};

const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  return (
    <Card raised fluid color="blue" className="audio-player">
      <Card.Content>
        <ImageSelector />
        <Card.Header
          content={<MixTitle title={"mixTitle"} saveNewTitle={() => {}} />}
          className="mix-title"
        />
      </Card.Content>
      <Card.Content extra>
        {/* <Controls
          currentTracklist={() => {}}
          addReleaseToTracklist={() => {}}
          initialiseTracklist={() => {}}
        /> */}
      </Card.Content>
    </Card>
  );
};
export default AudioPlayer;
