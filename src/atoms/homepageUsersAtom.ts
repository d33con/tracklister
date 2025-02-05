import { atom } from "jotai";
import { Creator } from "@/atoms/mixesAtom";

export type HomepageUsersState = Array<Creator>;

const defaultHomepageUsersState: HomepageUsersState = [];

export const homepageUsersState = atom<HomepageUsersState>(
  defaultHomepageUsersState
);
