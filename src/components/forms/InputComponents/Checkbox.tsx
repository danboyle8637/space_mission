import { CSSProperties } from "react";
import styled from "styled-components";

import { CheckmarkIcon } from "../../svgs/CheckIcon";

interface CheckboxProps {
  isComplete: boolean;
  makeSmall?: boolean;
}

const Box = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsla(240, 100%, 100%, 0.35);
  border-radius: var(--box-border-radius);
  width: var(--box-dimensions);
  height: var(--box-dimensions);
  box-shadow: 0 1px 4px 1px hsla(240, 0%, 0%, 0.3);
`;

const Check = styled(CheckmarkIcon)`
  width: 100%;
`;

export const Checkbox: React.FC<CheckboxProps> = ({
  isComplete,
  makeSmall = false,
}) => {
  const styles = {
    "--box-border-radius": makeSmall ? "8px" : "14px",
    "--box-dimensions": makeSmall ? "28px" : "54px",
  } as CSSProperties;

  return (
    <Box style={styles}>
      <Check
        isTextInput={false}
        isTrackingCheck={true}
        runAction={isComplete}
      />
    </Box>
  );
};
