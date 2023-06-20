import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Mix = {
  id: string;
  createdAt: Timestamp;
  creatorId?: string;
  audioURL?: string;
  filename?: string;
  audioDuration?: number;
  title: string;
  slug: string;
  imageURL?: string;
  description?: string;
  favouriteCount?: number;
  favouritedUsers?: Array<string>;
  genres?: Array<string>;
  tracklist?: Array<Object>;
};

interface MixState {
  mixes: Mix[];
  selectedMix: Mix | null;
  currentlyPlayingMix: Mix | null;
}

const defaultMixState: MixState = {
  mixes: [],
  selectedMix: null,
  currentlyPlayingMix: null,
};

export const mixState = atom<MixState>({
  key: "mixState",
  default: defaultMixState,
});
