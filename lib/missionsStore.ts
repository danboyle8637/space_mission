import create, { SetState } from "zustand";

import { MissionDoc } from "../src/types";

type MissionsState = {
  missions: MissionDoc[];
  setMissions: (missions: MissionDoc[]) => void;
};

export const missionsStore = create<MissionsState>(
  (set: SetState<MissionsState>) => ({
    missions: [],
    setMissions: (missions) =>
      set((state) => ({
        ...state,
        missions: missions,
      })),
  })
);
