import styles from "styled-components";

import { StartMission } from "./StartMission";
import { MissionGoalsForm } from "./MissionGoalsForm";
import { MissionId } from "../../../../types";

interface FooterProps {
  isActive: boolean;
  missionId: MissionId;
}

export const Footer: React.FC<FooterProps> = ({ isActive, missionId }) => {
  return (
    <>
      {isActive ? (
        <MissionGoalsForm missionId={missionId} />
      ) : (
        <StartMission missionId={missionId} />
      )}
    </>
  );
};
