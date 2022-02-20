import styled from "styled-components";

import { LoginForm } from "./LoginForm";

const ViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const LoginView = () => {
  return (
    <ViewContainer>
      <LoginForm />
    </ViewContainer>
  );
};
