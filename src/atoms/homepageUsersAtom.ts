import { atom } from "recoil";
import { Creator } from "@/atoms/mixesAtom";

type HomepageUsersState = Array<Creator>;

const defaultHomepageUsersState: HomepageUsersState = [];

export const homepageUsersState = atom<HomepageUsersState>({
  key: "homepageUsersState",
  default: defaultHomepageUsersState,
});
