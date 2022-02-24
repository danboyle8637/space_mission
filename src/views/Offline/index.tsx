import styled from "styled-components";

import { LostConnectionLogo } from "../../components/images/LostConnectionLogo";

const ViewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  isolation: isolate;
`;

const LogoContainer = styled.div`
  width: 300px;
`;

const BlueGalaxy = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--accent-teal);
  width: 460px;
  height: 460px;
  opacity: 0.2;
  filter: blur(100px);
  z-index: -1;
`;

const PinkGalaxy = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--accent-pink);
  width: 460px;
  height: 460px;
  opacity: 0.2;
  filter: blur(100px);
  z-index: -1;
`;

export const OfflineView = () => {
  return (
    <ViewContainer>
      <LogoContainer>
        <LostConnectionLogo />
      </LogoContainer>
      <BlueGalaxy />
      <PinkGalaxy />
    </ViewContainer>
  );
};
