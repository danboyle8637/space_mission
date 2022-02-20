import { useCallback } from "react";
import styled from "styled-components";

import { text14, text16 } from "../../../styles/typography";

interface DescriptionProps {
  headline: string;
  description: string;
}

const Container = styled.div`
  padding: 12px 12px 20px 12px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 8px;
  justify-items: start;
  width: 100%;
  pointer-events: none;
`;

const CardHeadline = styled.h3`
  ${text16}
  color: var(--accent-pink);
`;

const CardDescription = styled.p`
  ${text14}
  color: var(--accent-purple);
  line-height: 1.6;
  text-align: left;
`;

export const MissionDescription: React.FC<DescriptionProps> = ({
  headline,
  description,
}) => {
  const generateShortDescription = useCallback(() => {
    return description.slice(0, 120);
  }, [description]);

  return (
    <Container>
      <CardHeadline>{headline}</CardHeadline>
      <CardDescription>{generateShortDescription()} ...</CardDescription>
    </Container>
  );
};
