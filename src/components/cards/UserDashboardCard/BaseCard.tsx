import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-blue);
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
`;

export const BaseCard: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
