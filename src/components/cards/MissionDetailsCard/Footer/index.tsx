import styles from "styled-components";

import { StartMission } from "./StartMission";
import { MissionId } from "../../../../types";

interface FooterProps {
  isActive: boolean;
  missionId: MissionId;
}

export const Footer: React.FC<FooterProps> = ({ isActive, missionId }) => {
  return (
    <>{isActive ? <h1>Footer</h1> : <StartMission missionId={missionId} />}</>
  );
};
