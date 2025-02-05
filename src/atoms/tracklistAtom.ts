import { atom } from "jotai";

export type Tracklist = Array<{
  id: string;
  trackTime: number;
  trackName: string;
  label: string;
}>;

const defaultTracklistState: Tracklist = [];

export const tracklistState = atom<Tracklist>(defaultTracklistState);
