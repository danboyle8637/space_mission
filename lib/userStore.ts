import create, { SetState } from "zustand";

interface User {
  userId: string;
  callSign: string;
}

type UserState = {
  userId: string;
  activeMission: string;
  finishedMissions: string[];
  callSign: string;
  avatar: string;
  setUser: (user: User) => void;
};

export const userStore = create<UserState>((set: SetState<UserState>) => ({
  userId: "",
  activeMission: "",
  finishedMissions: [],
  callSign: "",
  avatar: "",
  setUser: (user) =>
    set((state) => ({
      ...state,
      userId: user.userId,
      callSign: user.callSign,
    })),
}));
