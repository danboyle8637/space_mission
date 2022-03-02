import create, { GetState, SetState } from "zustand";

import { endpoints } from "../src/utils/endpoints";
import { MissionId, MissionStatsDoc, Goals } from "../src/types";
import { userStore } from "./userStore";

export type InputName = "missionGoal1" | "missionGoal2" | "missionGoal3";

type MissionStatsState = {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
  setStatsDoc: (stats: Goals) => void;
};

export const missionStatsStore = create<MissionStatsState>(
  (set: SetState<MissionStatsState>) => ({
    isGoal1Complete: false,
    isGoal2Complete: false,
    isGoal3Complete: false,
    setStatsDoc: (stats) =>
      set(() => ({
        ...stats,
      })),
  })
);
