import { CSSProperties } from "react";
import styled from "styled-components";

import { text16 } from "../../../styles/typography";
import { ActiveMission } from "../../images/ActiveMission";
import { userStore } from "../../../../lib/userStore";

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

  const dynamicStyles = {
    "--label-color": "var(--accent-purple)",
  } as CSSProperties;

  return (
    <Container>
      <IdentityContainer>
        <Label>Active Mission:</Label>
        <Label style={dynamicStyles}>
          {activeMission.length > 0 ? activeMission : "No Active Mission"}
        </Label>
      </IdentityContainer>
      <ActiveMission
        imageUrl="https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/black-hole-card-image_R0qCJKeXQ.jpg?ik-sdk-version=javascript-1.4.3"
        altTag="Alt tag"
        titleTag="Title tag"
      />
    </Container>
  );
};
