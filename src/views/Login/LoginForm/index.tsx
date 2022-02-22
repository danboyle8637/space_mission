import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { SpaceMissionLogo } from "../../../components/images/SpaceMissionLogo";
import { LoginForm as Form } from "../../../components/forms/LoginForm";
import { loginFormOnLoad } from "../../../animations";

const Container = styled.div`
  position: relative;
  isolation: isolate;
`;

const FormContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 40px;
  justify-items: center;
  background-color: #0f0f1a;
  border-radius: 20px;
  width: 375px;
  box-shadow: 0 0 0 6px hsla(0, 0%, 0%, 0.4);
  opacity: 0;
  transform: translateY(-80px) scale(0.9);
  overflow: hidden;
`;

const Logo = styled.div`
  width: 176px;
`;

const BlueGalaxy = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--accent-teal);
  width: 160px;
  height: 160px;
  filter: blur(100px);
  z-index: -1;
`;

const PinkGalaxy = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--accent-pink);
  width: 160px;
  height: 160px;
  filter: blur(100px);
  z-index: -1;
`;

export const LoginForm = () => {
  const [shouldShowLoginForm, setShouldShowLoginForm] =
    useState<boolean>(false);

  const loginFormRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShouldShowLoginForm(true);
  }, []);

  useEffect(() => {
    const loginForm = loginFormRef.current;

    if (loginForm && shouldShowLoginForm) {
      loginFormOnLoad(loginForm);
    }
  }, [shouldShowLoginForm]);

  return (
    <Container>
      <FormContainer ref={loginFormRef}>
        <Logo>
          <SpaceMissionLogo />
        </Logo>
        <Form />
      </FormContainer>
      <BlueGalaxy />
      <PinkGalaxy />
    </Container>
  );
};
