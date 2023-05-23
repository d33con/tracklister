import React from "react";
import { Dimmer, Icon, Image } from "semantic-ui-react";

type ImageSelectorProps = {};

const ImageSelector: React.FC<ImageSelectorProps> = () => {
  const content = (
    <div>
      <Icon link bordered name="upload" size="huge" />
    </div>
  );
  return (
    <Dimmer.Dimmable
      as={Image}
      dimmed={true}
      dimmer={{
        active: true,
        content,
      }}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      src={""}
      size="large"
      className="cover-img"
    />
  );
};
export default ImageSelector;
