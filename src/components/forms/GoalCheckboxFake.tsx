import { CSSProperties } from "react";
import styled from "styled-components";

import { text14 } from "../../styles/typography";
import { Checkbox } from "./InputComponents/Checkbox";
import { InputName } from "../../../lib/missionStatsStore";

interface ButtonProps {
  name: string;
  label: string;
  isChecked: boolean;
  handleUpdateMissionStats: (name: string, value: boolean) => void;
  isDisabled: boolean;
}

const ButtonContainer = styled.button`
  padding: 12px;
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 12px;
  justify-items: start;
  align-items: center;
  background: var(--accent-blue);
  border-radius: 12px;
  border: none;
  width: 100%;
  outline: none;
  width: 100%;
  cursor: var(--button-cursor);
  transition: box-shadow, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
`;

const Label = styled.p`
  ${text14}
  color: var(--base-blue);
  font-weight: 700;
  width: 100%;
`;

export const GoalCheckboxFake: React.FC<ButtonProps> = ({
  name,
  label,
  isChecked,
  handleUpdateMissionStats,
  isDisabled,
}) => {
  const styles = {
    "--button-background":
      name === "deleteSavedWorkout" && !isDisabled
        ? "var(--additional-pink-1)"
        : name === "unBookmarkSavedWorkout" && isDisabled
        ? "var(--dark-7)"
        : "var(--additional-purple-2)",
    "--button-cursor": isDisabled ? "not-allowed" : "pointer",
  } as CSSProperties;

  return (
    <ButtonContainer
      style={styles}
      type="button"
      onClick={() => handleUpdateMissionStats(name, !isChecked)}
    >
      <Checkbox makeSmall={true} isComplete={isChecked} />
      <Label>{label}</Label>
    </ButtonContainer>
  );
};
