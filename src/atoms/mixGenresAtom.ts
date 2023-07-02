import { atom } from "recoil";

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

export const mixGenreState = atom<MixGenreState>({
  key: "mixGenreState",
  default: defaultMixGenreState,
});
