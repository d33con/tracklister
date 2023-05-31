import { Mix } from "@/atoms/mixesAtoms";
import NameAudioFileCard from "@/components/Cards/NameAudioFileCard";
import UploadAudioFileCard from "@/components/Cards/UploadAudioFileCard";
import LoggedOutUploadPage from "@/components/LoggedOut/LoggedOutUploadPage";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { Flex, Heading } from "@chakra-ui/react";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

type UploadIndexState = {
  selectedFile: string | ArrayBuffer;
  selectedFilename?: string;
  selectedFilesize?: string;
  fileLoading?: boolean;
  title: string;
};

const UploadIndex: React.FC = () => {
  const [
    { selectedFile, selectedFilename, selectedFilesize, fileLoading, title },
    setSelectedFile,
  ] = useState<UploadIndexState>({
    selectedFile: "",
    selectedFilename: "",
    selectedFilesize: "",
    fileLoading: false,
    title: "",
  });
  const [user] = useAuthState(auth);

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
          title,
        });
      }
    };
  };

  const onHandleNameChange = (value: string) =>
    setSelectedFile((prevState) => ({
      ...prevState,
      title: value,
    }));

  const handleCreateUploadedFile = async (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();
    // create a new 'mix' object with the audio and name
    const newMix: Mix = {
      id: uuidv4(),
      creatorId: user?.uid,
      title,
      createdAt: serverTimestamp() as Timestamp,
    };

    // store mix in the db
    try {
      const mixDocRef = await addDoc(collection(firestore, "mixes"), newMix);

      if (selectedFile) {
        // store in storage and get download url for audio file
        const audioRef = ref(storage, `mixes/${mixDocRef.id}/audio`);
        await uploadString(audioRef, selectedFile as string, "data_url");

        const downloadURL = await getDownloadURL(audioRef);

        // update mix doc by adding download url
        await updateDoc(mixDocRef, {
          audioURL: downloadURL,
        });
      }
    } catch (error: any) {
      console.log("mix upload error", error);
    }
  };

  return user ? (
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
            user={user}
          />
        ) : (
          <NameAudioFileCard
            selectedFilename={selectedFilename}
            selectedFilesize={selectedFilesize}
            onSelectFileUpload={onSelectFileUpload}
            onHandleNameChange={onHandleNameChange}
            handleCreateUploadedFile={handleCreateUploadedFile}
          />
        )}
      </Flex>
    </>
  ) : (
    <LoggedOutUploadPage />
  );
};

export default UploadIndex;
