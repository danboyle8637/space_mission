import { useState } from "react";
import styled from "styled-components";

import { BannerImage } from "./BannerImage";
import { MissionDescription } from "./Description";
import { Footer } from "./Footer";
import { Portal } from "../../shared/Portal";
import { MissionDetailsOverlay } from "../../overlays/MissionDetailsOverlay";
import { MissionDetailsCard } from "../../cards/MissionDetailsCard";
import { useIsHovering } from "../../../hooks/useIsHovering";

const CardContainer = styled.button`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  background-color: var(--dark-blue);
  border-radius: 12px;
  border: none;
  outline: none;
  width: 350px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  cursor: pointer;
  overflow: hidden;
  transform: translateY(0);
  transition: transform, box-shadow, 300ms ease-in-out;
  &:focus {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-pink);
    transform: translateY(-8px);
  }
  &:hover {
    box-shadow: 0 0 0 3px var(--base-blue), 0 0 0 6px var(--accent-pink);
    transform: translateY(-8px);
  }
`;

export const MissionCard = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { isHovering, toggleIsHovering } = useIsHovering();

  const toggleMissionDetails = () => {
    setIsDetailsOpen((prevValue) => !prevValue);
  };

  const closeMissionDetails = () => {
    setIsDetailsOpen(false);
  };

  const imageU4rl =
    "https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/black-hole-card-image_R0qCJKeXQ.jpg?ik-sdk-version=javascript-1.4.3";

  const testDescription = `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  return (
    <>
      <CardContainer
        type="button"
        aria-label="Mission button"
        onMouseOver={toggleIsHovering}
        onMouseLeave={toggleIsHovering}
        onClick={toggleMissionDetails}
      >
        <BannerImage
          imageUrl="https://ik.imagekit.io/csu76xuqqlwj/nerds-who-sell/projects/space-mission/black-hole-card-image_R0qCJKeXQ.jpg?ik-sdk-version=javascript-1.4.3"
          altTag="Alt tag for testing"
          titleTag="Title tag for testing"
        />
        <MissionDescription
          headline="Go Explore Gargantua"
          description={testDescription}
        />
        <Footer
          isActive={true}
          isGoal1Complete={true}
          isGoal2Complete={false}
          isGoal3Complete={false}
          isHovering={isHovering}
        />
      </CardContainer>
      <Portal>
        <MissionDetailsOverlay
          isOpen={isDetailsOpen}
          closeOverlay={closeMissionDetails}
        >
          <MissionDetailsCard
            isOpen={isDetailsOpen}
            imageUrl={imageU4rl}
            altTag="Test alt Tag"
            titleTag="Test title Tag"
            headline="Go Explore Gargantua"
            description={testDescription}
          />
        </MissionDetailsOverlay>
      </Portal>
    </>
  );
};
