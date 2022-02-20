import { CSSProperties } from "react";
import styled from "styled-components";

interface DotProps {
  isComplete: boolean;
}

const GoalDot = styled.div`
  background-color: var(--dot-background-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: 0 0 0 2px var(--accent-blue);
`;

export const GoalIndicator: React.FC<DotProps> = ({ isComplete }) => {
  const styles = {
    "--dot-background-color": isComplete ? "var(--accent-blue)" : "none",
  } as CSSProperties;

  return <GoalDot style={styles} />;
};
