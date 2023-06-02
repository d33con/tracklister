import { Mix } from "@/atoms/mixesAtoms";
import UploadLayout from "@/components/Layout/UploadLayout";
import LoggedOutUploadPage from "@/components/LoggedOut/LoggedOutUploadPage";
import NameFileToUploadCard from "@/components/Upload/NameFileToUploadCard";
import SelectFileToUploadCard from "@/components/Upload/SelectFileToUploadCard";
import UploadSecondPage from "@/components/Upload/UploadSecondPage";
import { auth, firestore, storage } from "@/firebase/clientApp";
import bytesToMB from "@/helpers/bytesToMB";
import { useToast } from "@chakra-ui/react";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";

const UploadIndex: React.FC = () => {
  const [uploadStage, setUploadStage] = useState("selecting");
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [selectedFileLoading, setSelectedFileLoading] = useState(false);
  const [mixTitle, setMixTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState({
    uploadPercent: 0,
    totalBytes: "",
    bytesTransferred: "",
  });
  const { uploadPercent, totalBytes, bytesTransferred } = uploadProgress;
  const [user] = useAuthState(auth);

  const uploadTaskRef = useRef<UploadTask | null>(null);
  const toast = useToast();

  const onSelectFileToUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
      // show spinner on button while file loads from user's machine
      fileReader.onloadstart = () => setSelectedFileLoading(true);
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        // file is ready to be uploaded
        setSelectedFile(evt.target?.files?.[0]);
        setSelectedFileLoading(false);
        setUploadStage("naming");
      }
    };
  };

  const handleUploadCancel = () => {
    if (uploadPercent < 100) {
      toast({
        title: "Upload cancelled.",
        description: "Please upload another audio file to begin.",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      uploadTaskRef.current?.cancel();
      setUploadStage("selecting");
    }
    // file has been uploaded => delete file from storage and mix from database and go back to upload page?
  };

  const handleCreateUploadedFile = async (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();
    setUploadStage("uploading");

    // create a new 'mix' object with the audio and name
    const newMix: Mix = {
      id: uuidv4(),
      creatorId: user?.uid,
      title: mixTitle,
      createdAt: serverTimestamp() as Timestamp,
    };

    // get a ref to store the mix in the mixes collection
    const mixDocRef = await addDoc(collection(firestore, "mixes"), newMix);

    if (selectedFile) {
      // upload to mixes collection in storage
      const audioRef = ref(storage, `mixes/${user?.uid}/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(audioRef, selectedFile);
      uploadTaskRef.current = uploadTask;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress({
            totalBytes: bytesToMB(snapshot.totalBytes),
            bytesTransferred: bytesToMB(snapshot.bytesTransferred),
            uploadPercent: progress,
          });
        },
        (error) => {
          // cancel error is handled by toast above
          setUploadProgress({
            totalBytes: "",
            bytesTransferred: "",
            uploadPercent: 0,
          });
          setSelectedFile(undefined);
        },
        () => {
          // get download url for audio file
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // update the mix doc ref and add the download URL
            updateDoc(mixDocRef, {
              audioURL: downloadURL,
            });
          });
        }
      );
    }
  };

  const onSelectImageToUpload = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
      // fileReader.onloadstart = () => setSelectedFileLoading(true);
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        // setSelectedFile(evt.target?.files?.[0]);
        // setSelectedFileLoading(false);
        console.log("image:", readerEvent.target.result);
      }
    };
  };

  return user ? (
    <>
      {uploadStage === "selecting" && (
        <UploadLayout>
          <SelectFileToUploadCard
            onSelectFileToUpload={onSelectFileToUpload}
            selectedFileLoading={selectedFileLoading}
          />
        </UploadLayout>
      )}
      {uploadStage === "naming" && (
        <UploadLayout>
          <NameFileToUploadCard
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            mixTitle={mixTitle}
            setMixTitle={setMixTitle}
            handleCreateUploadedFile={handleCreateUploadedFile}
          />
        </UploadLayout>
      )}
      {uploadStage === "uploading" && (
        <UploadSecondPage
          uploadPercent={uploadPercent}
          totalBytes={totalBytes}
          bytesTransferred={bytesTransferred}
          selectedFile={selectedFile}
          handleUploadCancel={handleUploadCancel}
          onSelectImageToUpload={onSelectImageToUpload}
        />
      )}
    </>
  ) : (
    <LoggedOutUploadPage />
  );
};

export default UploadIndex;
