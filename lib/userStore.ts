import create, { SetState } from "zustand";

import { UserDoc } from "../src/types";

type UserState = {
  userId: string;
  emailAddress: string;
  activeMission: string;
  finishedMissions: string[];
  callsign: string;
  avatar: string;
  setUser: (user: UserDoc) => void;
};

export const userStore = create<UserState>((set: SetState<UserState>) => ({
  userId: "",
  emailAddress: "",
  activeMission: "",
  finishedMissions: [],
  callsign: "",
  avatar: "",
  setUser: (user) =>
    set((state) => ({
      ...state,
      ...user,
    })),
}));
