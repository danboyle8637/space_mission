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
  getUserFromMagic: () => void;
};

export const userStore = create<UserState>((set: SetState<UserState>) => ({
  userId: "",
  emailAddress: "",
  activeMission: "",
  finishedMissions: [],
  callsign: "",
  avatar: "",
  setUser: (user) =>
    set((state) => {
      return {
        ...state,
        ...user,
      };
    }),
  getUserFromMagic: async () => {
    // get token from Magic

    const userIdRes = await fetch("/api/get-userId", {
      method: "GET",
    });

    const userIdData = await userIdRes.json();

    set((state) => ({
      ...state,
      userId: userIdData.userId,
    }));
  },
}));
