import { atom } from "recoil";

export type LoggedInUser = {
  creatorName: string;
  creatorSlug: string;
  photoURL?: string;
  email: string;
  uid: string;
};

interface LoggedInUserState {
  user?: LoggedInUser | null;
}

const defaultLoggedInUserState: LoggedInUserState = {
  user: null,
};

export const loggedInUserState = atom<LoggedInUserState>({
  key: "userState",
  default: defaultLoggedInUserState,
});
