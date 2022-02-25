export type MissionId = "mars" | "titan" | "pleiades" | "gargantua" | "x24c89";

export interface MissionDoc {
  missionId: MissionId;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

export interface UserDoc {
  userId: string;
  emailAddress: string;
  activeMission: string;
  finishedMissions: string[];
  callsign: string;
  avatar: string;
}

export interface Goals {
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
}

export interface MissionStatsDoc {
  missionId: MissionId;
  goals: Goals;
}
