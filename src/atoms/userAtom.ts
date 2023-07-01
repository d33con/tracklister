import { atom } from "recoil";

export type CurrentUser = {
  creatorName: string;
  creatorSlug: string;
  photoURL?: string;
  email: string;
  uid: string;
  biography?: string;
  location?: string;
};

type CurrentUserState = CurrentUser | null;

const defaultCurrentUserState: CurrentUserState = null;

export const currentUserState = atom<CurrentUserState>({
  key: "currentUserState",
  default: defaultCurrentUserState,
});
