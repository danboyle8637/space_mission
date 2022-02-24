import create, { SetState } from "zustand";

import { MissionDoc, MissionId } from "../src/types";

type ActiveMission = {
  missionId: MissionId | null;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
  setMission: (mission: MissionDoc) => void;
};

export const activeMissionStore = create<ActiveMission>(
  (set: SetState<ActiveMission>) => ({
    missionId: null,
    coverImage: "",
    altTag: "",
    titleTag: "",
    headline: "",
    description: "",
    difficulty: 0,
    setMission: (mission) =>
      set((state) => ({
        ...state,
        missionId: mission.missionId,
        coverImage: mission.coverImage,
        altTag: mission.altTag,
        titleTag: mission.titleTag,
        headline: mission.headline,
        description: mission.description,
        difficulty: mission.difficulty,
      })),
  })
);
