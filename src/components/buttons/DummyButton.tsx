import { CSSProperties } from "react";
import styled from "styled-components";

interface DummyButtonProps {
  isHovering: boolean;
}

const Button = styled.div`
  padding: 6px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--dark-blue);
  background-color: var(--button-background-color, var(--accent-pink));
  border-radius: 12px;
  outline: none;
  width: 100%;
  height: 50px;
  box-shadow: var(--button-box-shadow);
  transition: box-shadow, background-color, 300ms ease-in-out;
`;

export const DummyButton: React.FC<DummyButtonProps> = ({
  isHovering,
  children,
}) => {
  const styles = {
    "--button-box-shadow": isHovering
      ? "0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-teal)"
      : "none",
  } as CSSProperties;

  return <Button style={styles}>{children}</Button>;
};
