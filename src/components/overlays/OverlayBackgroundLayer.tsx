import { useEffect, useRef, CSSProperties } from "react";
import styled from "styled-components";

import { OverlayTransition } from "../../animations/OverlayTransition";
import { clickLayerOn, clickLayerOff } from "../../animations";

interface BackgroundLayerProps {
  isOpen: boolean;
  closeOverlay: () => void;
}

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0);
  z-index: 10;
  isolation: isolate;
`;

const ClickLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsla(0, 0%, 0%, 0.6);
  opacity: 0;
  backdrop-filter: blur(12px);
  z-index: -1;
`;

export const OverlayBackgroundLayer: React.FC<BackgroundLayerProps> = ({
  isOpen,
  closeOverlay,
  children,
}) => {
  const clickLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickLayer = clickLayerRef.current;

    if (clickLayer && isOpen) {
      clickLayerOn(clickLayer);
    }

    if (clickLayer && !isOpen) {
      clickLayerOff(clickLayer);
    }
  }, [isOpen]);

  return (
    <OverlayTransition isOpen={isOpen}>
      <BackgroundOverlay>
        <ClickLayer ref={clickLayerRef} onClick={closeOverlay} />
        {children}
      </BackgroundOverlay>
    </OverlayTransition>
  );
};
