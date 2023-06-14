import { atom } from "recoil";

export type MixGenre = Array<{
  name: string;
  displayName: string;
}>;

export type MixGenreState = Array<{
  label: string;
  value: string;
}>;

const defaultMixGenreState: MixGenreState = [
  {
    label: "",
    value: "",
  },
];

export const mixGenreState = atom<MixGenreState>({
  key: "mixGenreState",
  default: defaultMixGenreState,
});
