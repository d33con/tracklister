import { atom } from "recoil";

export interface DiscogsModalState {
  open: boolean;
  results?: Array<string>;
  searchValue?: string;
}

const defaultModalState: DiscogsModalState = {
  open: false,
  results: [],
  searchValue: "",
};

export const discogsModalState = atom<DiscogsModalState>({
  key: "discogsModalState",
  default: defaultModalState,
});
