import { Mix } from "@/atoms/mixesAtoms";
import NameFileToUploadCard from "@/components/Cards/NameFileToUploadCard";
import SelectFileToUploadCard from "@/components/Cards/SelectFileToUploadCard";
import LoggedOutUploadPage from "@/components/LoggedOut/LoggedOutUploadPage";
import UploadSecondPage from "@/components/Upload/UploadSecondPage";
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

const UploadIndex: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [selectedFileLoading, setSelectedFileLoading] = useState(false);
  const [mixTitle, setMixTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user] = useAuthState(auth);

  const onSelectFileToUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
      fileReader.onloadstart = () => setSelectedFileLoading(true);
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(evt.target?.files?.[0]);
        setSelectedFileLoading(false);
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
      const audioRef = ref(storage, `mixes/${user?.uid}/${selectedFile.name}`);
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
        {!selectedFile && !uploadProgress && (
          <SelectFileToUploadCard
            onSelectFileToUpload={onSelectFileToUpload}
            selectedFileLoading={selectedFileLoading}
          />
        )}
        {selectedFile && !uploadProgress && (
          <NameFileToUploadCard
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            mixTitle={mixTitle}
            setMixTitle={setMixTitle}
            handleCreateUploadedFile={handleCreateUploadedFile}
          />
        )}
        {uploadProgress && (
          <UploadSecondPage
            uploadProgress={uploadProgress}
            selectedFile={selectedFile}
          />
        )}
      </Flex>
    </>
  ) : (
    <LoggedOutUploadPage />
  );
};

export default UploadIndex;
