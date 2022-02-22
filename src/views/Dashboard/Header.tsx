import styled from "styled-components";

import { SpaceMissionLogo } from "../../components/images/SpaceMissionLogo";

const Container = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.div`
  width: 90px;
`;

export const Header = () => {
  return (
    <Container>
      <Logo>
        <SpaceMissionLogo />
      </Logo>
    </Container>
  );
};
