import styled from "styled-components";

import { SpaceHelmet } from "./SpaceHelmet";
import { SpaceMission } from "../svgs/SpaceMission";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;
  justify-items: center;
  width: 100%;
`;

const MissionHelmet = styled.div`
  position: relative;
  width: 50%;
  isolation: isolate;
`;

const MissionText = styled(SpaceMission)`
  width: 100%;
`;

const HelmetShadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  background-color: #000;
  width: 40px;
  height: 40px;
  filter: blur(6px);
  transform: translate(-50%, 0px);
  z-index: -1;
`;

const BlueGalaxy = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--accent-teal);
  width: 44px;
  height: 44px;
  filter: blur(30px);
  opacity: 0.6;
  z-index: -1;
`;

const PinkGalaxy = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--accent-pink);
  width: 44px;
  height: 44px;
  filter: blur(30px);
  z-index: -1;
`;

export const SpaceMissionLogo = () => {
  return (
    <Container>
      <MissionHelmet>
        <SpaceHelmet />
        <HelmetShadow />
        <BlueGalaxy />
        <PinkGalaxy />
      </MissionHelmet>
      <MissionText />
    </Container>
  );
};
