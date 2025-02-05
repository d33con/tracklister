import { atom } from "jotai";

export type MixGenre = {
  value: string;
  label: string;
};

export type MixGenreState = Array<{
  value: string;
  label: string;
}>;

const defaultMixGenreState: MixGenreState = [
  {
    label: "",
    value: "",
  },
];

export const mixGenreState = atom<MixGenreState>(defaultMixGenreState);
