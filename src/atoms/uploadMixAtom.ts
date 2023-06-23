import { atom } from "recoil";

export interface UploadMixState {
  uploadStage: "selecting" | "naming" | "uploading";
  selectedAudioFile: File | null;
  selectedAudioFileLoading: boolean;
  mixTitle: string;
}

const defaultUploadMixState: UploadMixState = {
  uploadStage: "selecting",
  selectedAudioFile: null,
  selectedAudioFileLoading: false,
  mixTitle: "", // use Mix object's title here instead
};

export const uploadMixState = atom<UploadMixState>({
  key: "uploadMixState",
  default: defaultUploadMixState,
});
