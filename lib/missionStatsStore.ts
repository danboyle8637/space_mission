import create, { SetState } from "zustand";

import { MissionId, MissionStatsDoc } from "../src/types";

type MissionStatsState = {
  missionId: MissionId | null;
  goals: {
    isGoal1Complete: boolean;
    isGoal2Complete: boolean;
    isGoal3Complete: boolean;
  };
  setStatsDoc: (stats: MissionStatsDoc) => void;
  updateInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const missionStatsStore = create<MissionStatsState>(
  (set: SetState<MissionStatsState>) => ({
    missionId: null,
    goals: {
      isGoal1Complete: false,
      isGoal2Complete: false,
      isGoal3Complete: false,
    },
    setStatsDoc: (stats) =>
      set((state) => ({
        ...state,
        missionId: stats.missionId,
        goals: stats.goals,
      })),
    updateInputValue: (event) =>
      set((state) => {
        const name = event.target.name;

        switch (name) {
          case "missionGoal1": {
            return {
              ...state,
              goals: {
                ...state.goals,
                isGoal1Complete: !state.goals.isGoal1Complete,
              },
            };
          }
          case "missionGoal2": {
            return {
              ...state,
              goals: {
                ...state.goals,
                isGoal2Complete: !state.goals.isGoal2Complete,
              },
            };
          }
          case "missionGoal3": {
            return {
              ...state,
              goals: {
                ...state.goals,
                isGoal3Complete: !state.goals.isGoal3Complete,
              },
            };
          }
          default: {
            return state;
          }
        }
      }),
  })
);
