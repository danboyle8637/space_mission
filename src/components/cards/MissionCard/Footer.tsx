import { CSSProperties } from "react";
import styled from "styled-components";

import { DummyButton } from "../../buttons/DummyButton";
import { GoalIndicator } from "../../cssDrawings/GoalIndicator";

interface FooterProps {
  isActive: boolean;
  isGoal1Complete: boolean;
  isGoal2Complete: boolean;
  isGoal3Complete: boolean;
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

export const Footer: React.FC<FooterProps> = ({
  isActive,
  isGoal1Complete,
  isGoal2Complete,
  isGoal3Complete,
  isHovering,
}) => {
  const styles = {
    "--button-background-color": isActive
      ? "var(--accent-pink)"
      : "var(--accent-teal)",
  } as CSSProperties;

  return (
    <Container>
      <DotsContainer>
        <GoalIndicator isComplete={isGoal1Complete} />
        <GoalIndicator isComplete={isGoal2Complete} />
        <GoalIndicator isComplete={isGoal3Complete} />
      </DotsContainer>
      <ButtonContainer style={styles}>
        <DummyButton isHovering={isHovering}>
          {isActive ? "Update Mission" : "Start Mission"}
        </DummyButton>
      </ButtonContainer>
    </Container>
  );
};
