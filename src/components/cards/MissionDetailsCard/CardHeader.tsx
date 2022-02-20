import styled from "styled-components";

import { text26 } from "../../../styles/typography";
import { MissionCardBanner } from "../../images/MissionCardBanner";

interface HeaderProps {
  imageUrl: string;
  altTag: string;
  titleTag: string;
  headline: string;
}

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  width: 100%;
  isolation: isolate;
`;

const Divider = styled.div`
  background-color: var(--accent-teal);
  width: 100%;
  height: 6px;
`;

const MissionHeadline = styled.h3`
  position: absolute;
  bottom: 20px;
  left: 20px;
  ${text26}
  color: var(--accent-pink);
  z-index: 1;
`;

export const CardHeader: React.FC<HeaderProps> = ({
  imageUrl,
  altTag,
  titleTag,
  headline,
}) => {
  return (
    <Container>
      <MissionCardBanner
        imageUrl={imageUrl}
        altTag={altTag}
        titleTag={titleTag}
      />
      <Divider />
      <MissionHeadline>{headline}</MissionHeadline>
    </Container>
  );
};
