import { atom } from "jotai";

export type CurrentUser = {
  uid: string;
  creatorName: string;
  creatorSlug: string;
  photoURL?: string;
  email: string;
  biography?: string;
  location?: string;
  website?: string;
};

type CurrentUserState = CurrentUser | null;

const defaultCurrentUserState: CurrentUserState = null;

export const currentUserState = atom<CurrentUserState>(defaultCurrentUserState);
