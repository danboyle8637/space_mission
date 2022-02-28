import styled from "styled-components";

import { Portal } from "../components/shared/Portal";
import { ErrorToasterOverlay } from "../components/overlays/ErrorToasterOverlay";
import { networkStore } from "../../lib/networkStore";
import Global from "../styles/Global";

const Layout: React.FC = ({ children }) => {
  const { isErrorToasterOpen, closeErrorToaster } = networkStore((state) => ({
    isErrorToasterOpen: state.isErrorToasterOpen,
    closeErrorToaster: state.closeErrorToaster,
  }));

  return (
    <>
      <BaseContainer>
        <Global />
        <ContentContainer>{children}</ContentContainer>
      </BaseContainer>
      <Portal>
        <ErrorToasterOverlay
          isOpen={isErrorToasterOpen}
          closeOverlay={closeErrorToaster}
        />
      </Portal>
    </>
  );
};

export default Layout;

const BaseContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
