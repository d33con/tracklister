import NameAudioFileCard from "@/components/Cards/NameAudioFileCard";
import UploadAudioFileCard from "@/components/Cards/UploadAudioFileCard";
import { Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

type UploadIndexState = {
  selectedFile: string | ArrayBuffer;
  selectedFilename?: string;
  selectedFilesize?: string;
  fileLoading?: boolean;
};

const UploadIndex: React.FC = () => {
  const [
    { selectedFile, selectedFilename, selectedFilesize, fileLoading },
    setSelectedFile,
  ] = useState<UploadIndexState>({
    selectedFile: "",
    selectedFilename: "",
    selectedFilesize: "",
    fileLoading: false,
  });

  const bytesToMB = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)}MB`;
  };

  const onSelectFileUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
      setSelectedFile((prevState) => ({
        ...prevState,
        fileLoading: true,
      }));
    }

    fileReader.onload = (readerEvt) => {
      if (readerEvt.target?.result && evt.target.files?.[0]) {
        setSelectedFile({
          selectedFile: readerEvt.target.result,
          selectedFilename: evt.target.files[0].name,
          selectedFilesize: bytesToMB(evt.target.files[0].size),
          fileLoading: false,
        });
      }
    };
  };

  return (
    <>
      <Flex
        bg="blue.900"
        color="whiteAlpha.900"
        justifyContent="center"
        pt={20}
        pb={40}
      >
        <Heading size="xl">Upload</Heading>
      </Flex>
      <Flex justifyContent="center" marginTop="-80px" pb={4}>
        {!selectedFile ? (
          <UploadAudioFileCard
            onSelectFileUpload={onSelectFileUpload}
            fileLoading={fileLoading}
          />
        ) : (
          <NameAudioFileCard
            selectedFilename={selectedFilename}
            selectedFilesize={selectedFilesize}
            onSelectFileUpload={onSelectFileUpload}
          />
        )}
      </Flex>
    </>
  );
};

export default UploadIndex;
