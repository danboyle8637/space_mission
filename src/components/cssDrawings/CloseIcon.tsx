import { useEffect, useRef, CSSProperties } from "react";
import styled from "styled-components";

import { overlayCloseButtonAni } from "../../animations";

interface CloseIconProps {
  isOpen: boolean;
  width?: number;
}

const IconContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  width: var(--icon-size);
  height: var(--icon-size);
`;

const XCross = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background: var(--close-icon-color, #f8f8f8);
  border-radius: 20px;
  width: calc((var(--icon-size) * 5) / 34);
  height: 100%;
  opacity: 0;
`;

export const CloseIcon: React.FC<CloseIconProps> = ({ isOpen, width }) => {
  const leftCrossRef = useRef<HTMLDivElement | null>(null);
  const rightCrossRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const leftCross = leftCrossRef.current;
    const rightCross = rightCrossRef.current;

    if (leftCross && rightCross && isOpen) {
      overlayCloseButtonAni(leftCross, rightCross);
    }
  }, [isOpen]);

  const styles = {
    "--icon-size": width ? `${width}px` : "34px",
  } as CSSProperties;

  return (
    <IconContainer style={styles}>
      <XCross ref={leftCrossRef} />
      <XCross ref={rightCrossRef} />
    </IconContainer>
  );
};
