import { CSSProperties } from "react";
import styled from "styled-components";

interface FormButtonProps {
  isValid: boolean;
}

const Button = styled.button`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-blue);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 12px;
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  cursor: var(--button-cursor);
  transition: box-shadow, background-color, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal);
  }
`;

export const FormButton: React.FC<FormButtonProps> = ({
  isValid,
  children,
}) => {
  const styles = {
    "--button-background-color": isValid
      ? "var(--accent-pink)"
      : "var(--base-blue)",
    "--button-cursor": isValid ? "pointer" : "not-allowed",
  } as CSSProperties;

  return (
    <Button style={styles} type="submit" disabled={!isValid}>
      {children}
    </Button>
  );
};
