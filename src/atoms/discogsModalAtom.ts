import { atom } from "recoil";

export interface DiscogsModalState {
  open: boolean;
  tracklistId: string;
  results: Array<{
    id: number;
    title: string;
    thumb: string;
    uri: string;
    label: Array<string>;
    format: Array<string>;
  }>;
  selectedReleaseLabel: string;
  searchValue: string;
  loadingTrackDetail: boolean;
  loadingTrackDetailId: number | null;
  individualTrackDetails?: {
    id: number | null;
    artists: Array<{
      name: string;
      join: string;
    }>;
    tracklist: Array<{
      position: string;
      title: string;
    }>;
  } | null;
}

const defaultModalState: DiscogsModalState = {
  open: false,
  tracklistId: "",
  selectedReleaseLabel: "",
  results: [],
  searchValue: "",
  loadingTrackDetail: false,
  loadingTrackDetailId: null,
  individualTrackDetails: null,
};

export const discogsModalState = atom<DiscogsModalState>({
  key: "discogsModalState",
  default: defaultModalState,
});
