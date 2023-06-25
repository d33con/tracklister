import { atom } from "recoil";
import { Mix } from "./mixesAtom";
import { Timestamp } from "firebase/firestore";

export interface UploadMixState {
  uploadStage: "selecting" | "naming" | "uploading";
  selectedAudioFile: File | null;
  selectedAudioFileLoading: boolean;
  selectedImageFile?: string;
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
    id: "",
    title: "",
    slug: "",
  },
};

export const uploadMixState = atom<UploadMixState>({
  key: "uploadMixState",
  default: defaultUploadMixState,
});
