import { CSSProperties } from "react";
import styled from "styled-components";

import { DummyButton } from "../../buttons/DummyButton";
import { GoalIndicator } from "../../cssDrawings/GoalIndicator";
import { missionStatsStore } from "../../../../lib/missionStatsStore";

interface FooterProps {
  isActive: boolean;

  isHovering: boolean;
}

const Container = styled.div`
  padding: 0 12px 12px 12px;
  display: grid;
  grid-template-columns: 1fr min-content;
  justify-items: center;
  align-items: center;
  width: 100%;
  pointer-events: none;
`;

const DotsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;
`;

const ButtonContainer = styled.div`
  width: 175px;
`;

export const Footer: React.FC<FooterProps> = ({ isActive, isHovering }) => {
  const { isGoal1Complete, isGoal2Complete, isGoal3Complete } =
    missionStatsStore((state) => ({
      isGoal1Complete: state.goals.isGoal1Complete,
      isGoal2Complete: state.goals.isGoal2Complete,
      isGoal3Complete: state.goals.isGoal3Complete,
    }));

  const goal1 = isActive && isGoal1Complete;
  const goal2 = isActive && isGoal2Complete;
  const goal3 = isActive && isGoal3Complete;

  const styles = {
    "--button-background-color": isActive
      ? "var(--accent-pink)"
      : "var(--accent-teal)",
  } as CSSProperties;

  return (
    <Container>
      <DotsContainer>
        <GoalIndicator isComplete={goal1} />
        <GoalIndicator isComplete={goal2} />
        <GoalIndicator isComplete={goal3} />
      </DotsContainer>
      <ButtonContainer style={styles}>
        <DummyButton isHovering={isHovering}>
          {isActive ? "Update Mission" : "Start Mission"}
        </DummyButton>
      </ButtonContainer>
    </Container>
  );
};
