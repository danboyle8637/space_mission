import styled from "styled-components";

import { SpaceHelmet } from "../images/SpaceHelmet";

const Button = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--accent-purple);
  border-radius: 50%;
  border: none;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 0 0 4px hsla(0, 0%, 0%, 0.4);
`;

export const AvatarButton = () => {
  return (
    <Button aria-label="Avatar Image Button">
      <SpaceHelmet />
    </Button>
  );
};
