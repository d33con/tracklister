import { atom } from "recoil";

export interface DiscogsModalState {
  open: boolean;
  results: Array<{
    id: number;
    title: string;
    thumb: string;
    uri: string;
    label: Array<string>;
    format: Array<string>;
  }>;
  searchValue: string;
  loadingTrackDetail: boolean;
  loadingTrackDetailId: number | null;
  individualTrackDetails: {
    id: number | null;
  };
}

const defaultModalState: DiscogsModalState = {
  open: false,
  results: [],
  searchValue: "",
  loadingTrackDetail: false,
  loadingTrackDetailId: null,
  individualTrackDetails: {
    id: null,
  },
};

export const discogsModalState = atom<DiscogsModalState>({
  key: "discogsModalState",
  default: defaultModalState,
});
