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

interface MixesState {
  mixes: Mix[];
}

const defaultMixState: MixesState = {
  mixes: [],
};

export const mixState = atom<MixesState>({
  key: "mixState",
  default: defaultMixState,
});
