import { CSSProperties } from "react";
import styled from "styled-components";

import { text16 } from "../../styles/typography";
import { Checkbox } from "./InputComponents/Checkbox";

interface ButtonProps {
  name: string;
  label: string;
  isChecked: boolean;
  updateInputValues: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const ButtonContainer = styled.div`
  padding: 12px;
  background: var(--button-background);
  border-radius: 20px;
  border: none;
  width: 100%;
  outline: none;
  width: 300px;
  transition: box-shadow, transform, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 4px 2px 0px hsla(0, 0%, 0%, 0.4), 0 0 0 2px var(--dark-4),
      0 0 0 5px var(--accent-teal);
  }
`;

const Label = styled.label`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 12px;
  justify-items: start;
  align-items: center;
  ${text16}
  font-weight: 700;
  width: 100%;
  cursor: var(--button-cursor);
`;

const HiddenCheckboxInput = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

export const SavedWorkoutActionCheckbox: React.FC<ButtonProps> = ({
  name,
  label,
  isChecked,
  updateInputValues,
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
    <ButtonContainer style={styles}>
      <Label>
        <Checkbox makeSmall={true} isComplete={isChecked} />
        {label}
        <HiddenCheckboxInput
          type="checkbox"
          id={name}
          name={name}
          checked={isChecked}
          onChange={updateInputValues}
          disabled={isDisabled}
        />
      </Label>
    </ButtonContainer>
  );
};
