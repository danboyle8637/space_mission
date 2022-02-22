import { useState } from "react";
import styled from "styled-components";

import { BannerImage } from "./BannerImage";
import { MissionDescription } from "./Description";
import { Footer } from "./Footer";
import { Portal } from "../../shared/Portal";
import { MissionDetailsOverlay } from "../../overlays/MissionDetailsOverlay";
import { MissionDetailsCard } from "../../cards/MissionDetailsCard";
import { useIsHovering } from "../../../hooks/useIsHovering";
import { MissionId } from "../../../types";

interface MissionCardProps {
  missionId: MissionId;
  coverImage: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  difficulty: number;
}

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

export const MissionCard: React.FC<MissionCardProps> = ({
  missionId,
  coverImage,
  altTag,
  titleTag,
  headline,
  description,
  difficulty,
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const { isHovering, toggleIsHovering } = useIsHovering();

  const toggleMissionDetails = () => {
    setIsDetailsOpen((prevValue) => !prevValue);
  };

  const closeMissionDetails = () => {
    setIsDetailsOpen(false);
  };

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
          imageUrl={coverImage}
          altTag={altTag}
          titleTag={titleTag}
        />
        <MissionDescription headline={headline} description={description} />
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
            imageUrl={coverImage}
            altTag={altTag}
            titleTag={titleTag}
            headline={headline}
            description={description}
          />
        </MissionDetailsOverlay>
      </Portal>
    </>
  );
};
