import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Mix = {
  id: string;
  creatorId?: string;
  title: string;
  audioURL?: string;
  createdAt: Timestamp;
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
