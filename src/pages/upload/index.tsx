import { Mix } from "@/atoms/mixesAtoms";
import NameFileToUploadCard from "@/components/Cards/NameFileToUploadCard";
import SelectFileToUploadCard from "@/components/Cards/SelectFileToUploadCard";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

type UploadIndexState = {
  selectedFile: File | null;
  selectedFilename?: string;
  selectedFilesize?: string;
  selectedFileLoading?: boolean;
};

const UploadIndex: React.FC = () => {
  const [
    { selectedFile, selectedFilename, selectedFilesize, selectedFileLoading },
    setSelectedFile,
  ] = useState<UploadIndexState>({
    selectedFile: null,
    selectedFilename: "",
    selectedFilesize: "",
    selectedFileLoading: false,
  });
  const [mixTitle, setMixTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user] = useAuthState(auth);

  const bytesToMB = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)}MB`;
  };

  const onSelectFileToUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
      fileReader.onloadstart = () =>
        setSelectedFile((prevState) => ({
          ...prevState,
          selectedFileLoading: true,
        }));
    }

    fileReader.onload = (readerEvt) => {
      if (readerEvt.target?.result && evt.target.files?.[0]) {
        setSelectedFile({
          selectedFile: evt.target.files?.[0],
          selectedFilename: evt.target.files[0].name,
          selectedFilesize: bytesToMB(evt.target.files[0].size),
          selectedFileLoading: false,
        });
      }
    };
  };

  const handleCreateUploadedFile = async (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();
    // create a new 'mix' object with the audio and name
    const newMix: Mix = {
      id: uuidv4(),
      creatorId: user?.uid,
      title: mixTitle,
      createdAt: serverTimestamp() as Timestamp,
    };

    // store mix in the db
    const mixDocRef = await addDoc(collection(firestore, "mixes"), newMix);

    if (selectedFile) {
      // store in storage and get download url for audio file
      const audioRef = ref(
        storage,
        `mixes/${mixDocRef.id}/${selectedFilename}`
      );
      const uploadTask = uploadBytesResumable(audioRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(mixDocRef, {
              audioURL: downloadURL,
            });
          });
        }
      );
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
          <SelectFileToUploadCard
            onSelectFileToUpload={onSelectFileToUpload}
            selectedFileLoading={selectedFileLoading}
          />
        ) : (
          <NameFileToUploadCard
            selectedFilename={selectedFilename}
            selectedFilesize={selectedFilesize}
            onSelectFileToUpload={onSelectFileToUpload}
            setMixTitle={setMixTitle}
            mixTitle={mixTitle}
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
