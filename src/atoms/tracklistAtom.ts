import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export type Tracklist = Array<{
  id: string;
  trackTime: number;
  trackName: string;
  label: string;
}>;

const defaultTracklistState: Tracklist = [
  {
    id: uuidv4(),
    trackTime: 0,
    trackName: "",
    label: "",
  },
];

export const tracklistState = atom<Tracklist>({
  key: "tracklistState",
  default: defaultTracklistState,
});
