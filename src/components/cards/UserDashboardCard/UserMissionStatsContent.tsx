import styled from "styled-components";

import { text16 } from "../../../styles/typography";
import { GoalIndicator } from "../../cssDrawings/GoalIndicator";
import { CircleGraph } from "../../svgs/CircleGraph";
import { missionStatsStore } from "../../../../lib/missionStatsStore";
import { useCallback } from "react";

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
  const { isGoal1Complete, isGoal2Complete, isGoal3Complete } =
    missionStatsStore((state) => ({
      isGoal1Complete: state.isGoal1Complete,
      isGoal2Complete: state.isGoal2Complete,
      isGoal3Complete: state.isGoal3Complete,
    }));

  const calcPercentComplete = useCallback(() => {
    if (isGoal1Complete && !isGoal2Complete && !isGoal3Complete) {
      return 3;
    } else if (isGoal1Complete && isGoal2Complete && !isGoal3Complete) {
      return 6;
    } else if (isGoal1Complete && isGoal2Complete && isGoal3Complete) {
      return 10;
    } else {
      return 0;
    }
  }, [isGoal1Complete, isGoal2Complete, isGoal3Complete]);

  return (
    <Container>
      <StatsContainer>
        <Label>Mission Status:</Label>
        <DotsContainer>
          <GoalIndicator isComplete={isGoal1Complete} />
          <GoalIndicator isComplete={isGoal2Complete} />
          <GoalIndicator isComplete={isGoal3Complete} />
        </DotsContainer>
      </StatsContainer>
      <StatusGraph>
        <CircleGraph value={calcPercentComplete()} runAction={true} />
      </StatusGraph>
    </Container>
  );
};
