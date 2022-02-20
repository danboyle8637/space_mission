import { Transition } from "react-transition-group";
import { animate } from "motion";

interface DrawerTransitionProps {
  isOpen: boolean;
}

export const OverlayTransition: React.FC<DrawerTransitionProps> = ({
  isOpen,
  children,
}) => {
  const menuEnter = (node: HTMLElement): void => {
    if (isOpen) {
      animate(node, { opacity: 1 }, { duration: 0 });
    }
  };

  const menuExit = (node: HTMLElement): void => {
    if (!isOpen) {
      animate(node, { opacity: 0 }, { duration: 0, delay: 0.4 });
    }
  };

  return (
    <Transition
      in={isOpen}
      timeout={1000}
      mountOnEnter={true}
      unmountOnExit={true}
      onEnter={(node: HTMLElement) => menuEnter(node)}
      onExit={(node: HTMLElement) => menuExit(node)}
    >
      {children}
    </Transition>
  );
};
