import styled from "styled-components";

import { text14, text16 } from "../../styles/typography";
import { CloseIcon } from "../cssDrawings/CloseIcon";
import { OverlayTransition } from "../../animations/OverlayTransition";
import { networkStore } from "../../../lib/networkStore";

interface OverlayProps {
  isOpen: boolean;
  closeOverlay: () => void;
}

const Container = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  gap: 12px;
  justify-items: start;
  background-color: #bb144c;
  border-radius: 12px;
  box-shadow: 0 0 0 6px hsla(328, 99%, 48%, 0.4);
  width: 400px;
  isolation: isolate;
`;

const Headline = styled.h3`
  ${text16}
  font-weight: 700;
  color: #f8f8f8;
`;

const Message = styled.p`
  ${text14}
  font-weight: 600;
  line-height: 1.6;
  color: #f8f8f8;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  outline-offset: 6px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  z-index: 1;
`;

export const ErrorToasterOverlay: React.FC<OverlayProps> = ({
  isOpen,
  closeOverlay,
}) => {
  const { errorHeadline, errorMessage } = networkStore((state) => ({
    errorHeadline: state.errorHeadline,
    errorMessage: state.errorMessage,
  }));

  return (
    <OverlayTransition isOpen={isOpen}>
      <Container>
        <Headline>{errorHeadline}</Headline>
        <Message>{errorMessage}</Message>
        <CloseButton type="button" onClick={closeOverlay}>
          <CloseIcon isOpen={true} width={20} />
        </CloseButton>
      </Container>
    </OverlayTransition>
  );
};
