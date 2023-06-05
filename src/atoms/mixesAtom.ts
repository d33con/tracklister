import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Mix = {
  id: string;
  createdAt: Timestamp;
  creatorId?: string;
  audioURL?: string;
  title: string;
  imageURL?: string;
  description?: string;
  genres?: Array<string>;
  tracklist?: Array<Object>;
};

interface MixState {
  mixes: Mix[];
  selectedMix: Mix | null;
}

const defaultMixState: MixState = {
  selectedMix: null,
  mixes: [],
};

export const mixState = atom<MixState>({
  key: "mixState",
  default: defaultMixState,
});
