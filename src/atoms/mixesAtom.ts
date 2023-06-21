import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";
import { StringLiteral } from "typescript";

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
  tracklist?: Tracklist;
};

export type Tracklist = Array<{
  id: string;
  trackTime: number;
  trackName: string;
  label: string;
}>;

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
