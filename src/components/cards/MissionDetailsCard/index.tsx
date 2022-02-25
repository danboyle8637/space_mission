import { useEffect, useRef } from "react";
import styled from "styled-components";

import { CardHeader } from "./CardHeader";
import { MissionDescription } from "./MissionDescription";
import { Footer } from "./Footer";
import { missionDetailsOpen, missionDetailsClosed } from "../../../animations";
import { MissionId } from "../../../types";

interface MissionDetailsProps {
  isOpen: boolean;
  missionId: MissionId;
  imageUrl: string;
  altTag: string;
  titleTag: string;
  headline: string;
  description: string;
  isActive: boolean;
}

const CardContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  background-color: var(--dark-blue);
  border-radius: 20px;
  box-shadow: 0 0 0 12px hsla(0, 0%, 0%, 0.3);
  width: 600px;
  opacity: 0;
  transform: translate(-50%, -60%) scale(0.9);
  overflow: hidden;
  z-index: 1;
`;

export const MissionDetailsCard: React.FC<MissionDetailsProps> = ({
  isOpen,
  missionId,
  imageUrl,
  altTag,
  titleTag,
  headline,
  description,
  isActive,
}) => {
  const missionDetailsCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const missionDetailsCard = missionDetailsCardRef.current;

    if (missionDetailsCard && isOpen) {
      missionDetailsOpen(missionDetailsCard);
    }

    if (missionDetailsCard && !isOpen) {
      missionDetailsClosed(missionDetailsCard);
    }
  }, [isOpen]);

  return (
    <CardContainer ref={missionDetailsCardRef} tabIndex={-1}>
      <CardHeader
        imageUrl={imageUrl}
        altTag={altTag}
        titleTag={titleTag}
        headline={headline}
      />
      <MissionDescription description={description} />
      <Footer isActive={isActive} missionId={missionId} />
    </CardContainer>
  );
};
