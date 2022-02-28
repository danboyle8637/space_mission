import { useEffect, CSSProperties } from "react";
import styled from "styled-components";

import { text16 } from "../../../styles/typography";
import { ActiveMission } from "../../images/ActiveMission";
import { MissionPlaceholder } from "./MissionPlaceholder";
import { userStore } from "../../../../lib/userStore";
import { missionsStore } from "../../../../lib/missionsStore";
import { activeMissionStore } from "../../../../lib/activeMissionStore";
import { capitalizeName } from "../../../utils/utilityFunctions";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;

const IdentityContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 4px;
  justify-items: start;
  width: 100%;
`;

const Label = styled.p`
  ${text16}
  color: var(--label-color, var(--accent-pink));
`;

export const UserMissionContent = () => {
  const activeMission = userStore((state) => state.activeMission);

  const missions = missionsStore((state) => state.missions);

  const { missionImageData, setActiveMission } = activeMissionStore(
    (state) => ({
      missionImageData: {
        coverImage: state.coverImage,
        altTag: state.altTag,
        titleTag: state.titleTag,
      },
      setActiveMission: state.setMission,
    })
  );

  useEffect(() => {
    if (activeMission && missions.length > 0) {
      const activeMissionData = missions.filter(
        (mission) => mission.missionId === activeMission
      );

      setActiveMission(activeMissionData[0]);
    }
  }, [activeMission, missions]);

  const missionName =
    activeMission.length > 0
      ? capitalizeName(activeMission)
      : "No Active Mission";

  const dynamicStyles = {
    "--label-color": "var(--accent-purple)",
  } as CSSProperties;

  return (
    <Container>
      <IdentityContainer>
        <Label>Active Mission:</Label>
        <Label style={dynamicStyles}>{missionName}</Label>
      </IdentityContainer>
      {activeMission !== "" && missionImageData.coverImage !== "" ? (
        <ActiveMission
          imageUrl={missionImageData.coverImage}
          altTag={missionImageData.altTag}
          titleTag={missionImageData.titleTag}
        />
      ) : (
        <MissionPlaceholder />
      )}
    </Container>
  );
};
