import styled from "styled-components";

import { text16 } from "../../../styles/typography";

interface DescriptionProps {
  description: string;
}

const Container = styled.div`
  padding: 20px;
  width: 100%;
`;

const Descriptioon = styled.p`
  ${text16}
  color: var(--accent-purple);
  line-height: 1.6;
  text-align: left;
`;

export const MissionDescription: React.FC<DescriptionProps> = ({
  description,
}) => {
  return (
    <Container>
      <Descriptioon>{description}</Descriptioon>
    </Container>
  );
};
