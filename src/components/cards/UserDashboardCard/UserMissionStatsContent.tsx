import styled from "styled-components";

import { text16 } from "../../../styles/typography";
import { GoalIndicator } from "../../cssDrawings/GoalIndicator";
import { CircleGraph } from "../../svgs/CircleGraph";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 8px;
  justify-items: start;
  width: 100%;
`;

const Label = styled.p`
  ${text16}
  color: var(--accent-pink);
`;

const DotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;
`;

const StatusGraph = styled.div`
  width: 60px;
`;

export const UserMissionStatsContent = () => {
  return (
    <Container>
      <StatsContainer>
        <Label>Mission Status:</Label>
        <DotsContainer>
          <GoalIndicator isComplete={true} />
          <GoalIndicator isComplete={false} />
          <GoalIndicator isComplete={false} />
        </DotsContainer>
      </StatsContainer>
      <StatusGraph>
        <CircleGraph value={6} runAction={true} />
      </StatusGraph>
    </Container>
  );
};
