import styled from "styled-components";

import { MissionPlaceholderIcon } from "../../svgs/MissionPlaceholderIcon";

const Container = styled.div`
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--base-blue);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
  overflow: hidden;
`;

const Icon = styled(MissionPlaceholderIcon)`
  width: 14px;
`;

export const MissionPlaceholder = () => {
  return (
    <Container>
      <Icon />
    </Container>
  );
};
