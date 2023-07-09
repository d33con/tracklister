import { atom } from "recoil";

export type Tracklist = Array<{
  id: string;
  trackTime: number;
  trackName: string;
  label: string;
}>;

const defaultTracklistState: Tracklist = [];

export const tracklistState = atom<Tracklist>({
  key: "tracklistState",
  default: defaultTracklistState,
});
