import { CSSProperties } from "react";
import styled from "styled-components";

import { text16 } from "../../../styles/typography";
import { AvatarButton } from "../../buttons/AvatarButton";
import { capitalizeName } from "../../../utils/utilityFunctions";
import { userStore } from "../../../../lib/userStore";

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 20px;
  justify-items: start;
  align-items: center;
  width: 100%;
`;

const IdentityContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 4px;
  justify-items: start;
  width: 100%;
`;

const Label = styled.p`
  ${text16}
  color: var(--label-color, var(--accent-pink));
`;

export const UserIdentityContent = () => {
  const callSign = userStore((state) => state.callsign);

  const formattedCallSign =
    callSign.length > 0 ? capitalizeName(callSign) : "Rookie";

  const dynamicStyles = {
    "--label-color": "var(--accent-purple)",
  } as CSSProperties;

  return (
    <Container>
      <AvatarButton />
      <IdentityContainer>
        <Label>Astronaut Call Sign:</Label>
        <Label style={dynamicStyles}>
          {callSign.length > 0 ? formattedCallSign : "Rookie"}
        </Label>
      </IdentityContainer>
    </Container>
  );
};
