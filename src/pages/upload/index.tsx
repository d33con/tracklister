import { MixGenreState } from "@/atoms/mixGenresAtom";
import { Mix } from "@/atoms/mixesAtom";
import { tracklistState } from "@/atoms/tracklistAtom";
import { uploadMixState } from "@/atoms/uploadMixAtom";
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
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  UploadTask,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { MultiValue } from "react-select/dist/declarations/src/types";

const UploadIndex: React.FC = () => {
  const [mixGenres, setMixGenres] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);
  const tracklist = useRecoilValue(tracklistState);
  const [uploadMix, setUploadMix] = useRecoilState(uploadMixState);
  // GET THE CURRENT LOGGED IN USER FROM GLOBAL STATE
  const [user] = useAuthState(auth);

  const uploadTaskRef = useRef<UploadTask | null>(null);
  const uploadedAudioRef = useRef<HTMLAudioElement>(null);
  const toast = useToast();

  const router = useRouter();

  // get the duration of the audio file selected
  useEffect(() => {
    if (uploadMix.selectedAudioFile) {
      const objectURL = URL.createObjectURL(
        uploadMix.selectedAudioFile as Blob
      );
      uploadedAudioRef.current?.setAttribute("src", objectURL);
      uploadedAudioRef.current?.addEventListener("canplaythrough", () => {
        setUploadMix((prevState) => ({
          ...prevState,
          mix: {
            ...prevState.mix,
            audioDuration: Math.round(
              uploadedAudioRef.current?.duration as number
            ),
          },
        }));
      });
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [uploadMix.selectedAudioFile, setUploadMix]);

  const onSelectAudioFileToUpload = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
      // show spinner on button while file loads from user's machine
      fileReader.onloadstart = () =>
        setUploadMix((prevState) => ({
          ...prevState,
          selectedAudioFileLoading: true,
        }));
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        // file is ready to be uploaded
        setUploadMix((prevState) => ({
          ...prevState,
          selectedAudioFile: evt.target.files?.[0] as File,
          selectedAudioFileLoading: false,
          uploadStage: "naming",
        }));
      }
    };
  };

  const handleCreateUploadedAudioFile = async (
    evt: React.FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();
    setUploadMix((prevState) => ({
      ...prevState,
      uploadStage: "uploading",
    }));
    if (uploadMix.selectedAudioFile) {
      // upload to audio collection in storage
      const audioRef = ref(
        storage,
        `mixes/${user?.uid}/audio/${uploadMix.selectedAudioFile.name}`
      );
      const uploadTask = uploadBytesResumable(
        audioRef,
        uploadMix.selectedAudioFile
      );
      uploadTaskRef.current = uploadTask;

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadMix((prevState) => ({
            ...prevState,
            uploadProgress: {
              totalBytes: bytesToMB(snapshot.totalBytes),
              bytesTransferred: bytesToMB(snapshot.bytesTransferred),
              uploadPercent: progress,
            },
          }));
        },
        (error) => {
          // cancel error is handled by toast above
          setUploadMix((prevState) => ({
            ...prevState,
            selectedAudioFile: null,
            uploadProgress: {
              totalBytes: "",
              bytesTransferred: "",
              uploadPercent: 0,
            },
          }));
        },
        () => {
          // get download url for audio file
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadMix((prevState) => ({
              ...prevState,
              mix: {
                ...prevState.mix,
                audioURL: downloadURL,
              },
            }));
          });
        }
      );
    }
  };

  const handleUploadCancel = () => {
    if (uploadMix.uploadProgress.uploadPercent < 100) {
      toast({
        title: "Upload cancelled.",
        description: "Please upload another audio file to begin.",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      uploadTaskRef.current?.cancel();
      setUploadMix((prevState) => ({
        ...prevState,
        uploadStage: "selecting",
      }));
    }
    // file has already been uploaded => delete file from storage and mix from database and go back to upload page?
    const audioFileRef = ref(
      storage,
      `mixes/${user?.uid}/audio/${uploadMix.selectedAudioFile?.name}`
    );
    // Delete the file
    deleteObject(audioFileRef)
      .then(() => {
        // File deleted successfully
        // toast
        toast({
          title: "Upload cancelled.",
          description: "Please upload another audio file to begin.",
          status: "info",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        // or redirect?
      })
      .then(() => {
        setUploadMix((prevState) => ({
          ...prevState,
          uploadStage: "selecting",
          mix: {
            ...prevState.mix,
            title: "",
            audioURL: "",
          },
          selectedAudioFile: null,
          uploadProgress: {
            uploadPercent: 0,
            totalBytes: "",
            bytesTransferred: "",
          },
        }));
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };

  const handleMixGenreCreation = () => {
    if (mixGenres.length > 0) {
      mixGenres.map(async (genre) => {
        const kebabCaseGenre = genre.value.replace(/\s+/g, "-").toLowerCase();
        const mixGenresDocRef = doc(firestore, "mixGenres", kebabCaseGenre);
        const mixGenreDoc = await getDoc(mixGenresDocRef);

        if (mixGenreDoc.exists()) {
          return;
        }

        // create the mixGenre
        await setDoc(mixGenresDocRef, {
          name: kebabCaseGenre,
          displayName: genre.label,
        });
      });
    }
  };

  const publishMix = async (evt: React.FormEvent<HTMLFormElement>) => {
    setUploadMix((prevState) => ({
      ...prevState,
      isPublishing: true,
    }));
    evt.preventDefault();

    // check if mix genres exist
    handleMixGenreCreation();

    // create a new 'mix' object with the audio and name
    const newMix: Mix = {
      id: uuidv4(),
      createdAt: serverTimestamp() as Timestamp,
      creatorId: user?.uid,
      audioURL: uploadMix.mix.audioURL,
      filename: uploadMix.selectedAudioFile?.name,
      audioDuration: uploadMix.mix.audioDuration,
      title: uploadMix.mix.title,
      slug: uploadMix.mix.title.replace(/\s+/g, "-").toLowerCase(),
      description: uploadMix.mix.description,
      genres: mixGenres.map((genre) => genre.label),
      favouriteCount: 0,
      tracklist,
    };

    // store the mix in the db
    try {
      const mixDocRef = doc(firestore, "mixes", newMix.id);
      await setDoc(mixDocRef, newMix);
      // if there is an image get a ref to store the mix's image in the mixes/image collection
      if (uploadMix.selectedImageFile && uploadMix.mix.audioURL) {
        const mixImageRef = ref(
          storage,
          `mixes/${user?.uid}/images/${newMix.id}`
        );
        await uploadString(
          mixImageRef,
          uploadMix.selectedImageFile,
          "data_url"
        );
        const mixImageDownloadURL = await getDownloadURL(mixImageRef);
        // update the mix doc ref and add the download URL
        await updateDoc(mixDocRef, {
          imageURL: mixImageDownloadURL,
        });
      }
    } catch (error: any) {
      // handle error
      console.log(error.message);
    }
    setUploadMix((prevState) => ({
      ...prevState,
      isPublishing: false,
    }));
    // redirect back to dashboard or to this mix's page
    router.push("/dashboard/my-dashboard");
  };

  return user ? (
    <>
      {uploadMix.uploadStage === "selecting" && (
        <UploadLayout>
          <SelectFileToUploadCard
            onSelectAudioFileToUpload={onSelectAudioFileToUpload}
          />
        </UploadLayout>
      )}
      {uploadMix.uploadStage === "naming" && (
        <UploadLayout>
          <audio ref={uploadedAudioRef} hidden />
          <NameFileToUploadCard
            onSelectAudioFileToUpload={onSelectAudioFileToUpload}
            handleCreateUploadedAudioFile={handleCreateUploadedAudioFile}
          />
        </UploadLayout>
      )}
      {uploadMix.uploadStage === "uploading" && (
        <UploadSecondPage
          selectedFile={uploadMix.selectedAudioFile}
          handleUploadCancel={handleUploadCancel}
          publishMix={publishMix}
          setMixGenres={setMixGenres}
        />
      )}
    </>
  ) : (
    <LoggedOutUploadPage />
  );
};

export default UploadIndex;
