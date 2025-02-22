import { Timestamp } from "firebase/firestore";
import { atom } from "jotai";
import { Tracklist } from "./tracklistAtom";

export type Comments = {
  createdAt: number;
  id: string;
  text: string;
  user: {
    userId: string;
    creatorName: string;
    creatorSlug: string;
    photoURL?: string;
  };
};

export type Mix = {
  id: string;
  createdAt: Timestamp;
  creatorId?: string;
  creatorName?: string;
  creatorSlug?: string;
  audioURL?: string;
  filename?: string;
  audioDuration?: number;
  title: string;
  slug: string;
  imageURL?: string;
  description?: string;
  favouriteCount?: number;
  favouritedByUsers?: Array<string>;
  genres?: Array<string>;
  tracklist?: Tracklist;
  playCount: number;
  comments?: Comments[];
};

export type Creator = {
  uid: string;
  creatorName: string;
  creatorSlug: string;
  photoURL?: string;
  email: string;
  biography?: string;
  location?: string;
  website?: string;
};

interface MixState {
  mixes: Mix[];
  selectedMix: Mix | null;
  selectedMixCreator: Creator | null;
  currentlyPlayingMix: Mix | null;
  audioPlaying: boolean;
  imageURL: string;
}

const defaultMixState: MixState = {
  mixes: [],
  selectedMix: null,
  selectedMixCreator: null,
  currentlyPlayingMix: null,
  audioPlaying: false,
  imageURL: "",
};

export const mixState = atom<MixState>(defaultMixState);
