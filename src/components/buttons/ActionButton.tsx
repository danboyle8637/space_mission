import { CSSProperties } from "react";
import styled from "styled-components";

interface ActionButtonProps {
  handleClick: () => void;
  isDisabled: boolean;
}

const Button = styled.button`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--button-label-color);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 0;
  border: none;
  outline: none;
  width: 100%;
  height: 60px;
  box-shadow: var(--button-box-shadow);
  cursor: var(--button-cursor);
  transition: box-shadow, background-color, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;

export const ActionButton: React.FC<ActionButtonProps> = ({
  handleClick,
  isDisabled,
  children,
}) => {
  const styles = {
    "--button-label-color": isDisabled ? "#2C2C4E" : "var(--dark-blue)",
    "--button-background-color": isDisabled
      ? "var(--base-blue)"
      : "var(--accent-pink)",
    "--button-cursor": isDisabled ? "not-allowed" : "pointer",
  } as CSSProperties;

  return (
    <Button
      style={styles}
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
    >
      {children}
    </Button>
  );
};
