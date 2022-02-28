import styled from "styled-components";

import { text16 } from "../../../styles/typography";
import { GoalIndicator } from "../../cssDrawings/GoalIndicator";
import { CircleGraph } from "../../svgs/CircleGraph";
import { userStore } from "../../../../lib/userStore";
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
  const activeMission = userStore((state) => state.activeMission);
  const { missionId, isGoal1Complete, isGoal2Complete, isGoal3Complete } =
    missionStatsStore((state) => ({
      missionId: state.missionId,
      isGoal1Complete: state.goals.isGoal1Complete,
      isGoal2Complete: state.goals.isGoal2Complete,
      isGoal3Complete: state.goals.isGoal3Complete,
    }));

  const isCurrentMission = activeMission === missionId;
  const goal1 = isCurrentMission && isGoal1Complete;
  const goal2 = isCurrentMission && isGoal2Complete;
  const goal3 = isCurrentMission && isGoal3Complete;

  const calcPercentComplete = useCallback(() => {
    if (goal1 && !goal2 && !goal3) {
      return 3;
    } else if (goal1 && goal2 && !goal3) {
      return 6;
    } else if (goal1 && goal2 && goal3) {
      return 10;
    } else {
      return 0;
    }
  }, [goal1, goal2, goal3]);

  return (
    <Container>
      <StatsContainer>
        <Label>Mission Status:</Label>
        <DotsContainer>
          <GoalIndicator isComplete={goal1} />
          <GoalIndicator isComplete={goal2} />
          <GoalIndicator isComplete={goal3} />
        </DotsContainer>
      </StatsContainer>
      <StatusGraph>
        <CircleGraph value={calcPercentComplete()} runAction={true} />
      </StatusGraph>
    </Container>
  );
};
