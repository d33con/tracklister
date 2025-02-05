import { atom } from "jotai";
import { Mix } from "./mixesAtom";
import { Timestamp, serverTimestamp } from "firebase/firestore";

export interface UploadMixState {
  uploadStage: "selecting" | "naming" | "uploading";
  selectedAudioFile: File | null;
  selectedAudioFileLoading: boolean;
  selectedImageFile?: string;
  newImageSelected?: boolean;
  isPublishing: boolean;
  uploadProgress: {
    uploadPercent: number;
    totalBytes: string;
    bytesTransferred: string;
  };
  mix: Mix;
}

const defaultUploadMixState: UploadMixState = {
  uploadStage: "selecting",
  selectedAudioFile: null,
  selectedAudioFileLoading: false,
  isPublishing: false,
  uploadProgress: {
    uploadPercent: 0,
    totalBytes: "",
    bytesTransferred: "",
  },
  mix: {
    createdAt: serverTimestamp() as Timestamp,
    id: "",
    title: "",
    slug: "",
    description: "",
    playCount: 0,
  },
};

export const uploadMixState = atom<UploadMixState>(defaultUploadMixState);
