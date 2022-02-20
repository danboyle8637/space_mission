import { OverlayBackgroundLayer } from "./OverlayBackgroundLayer";

interface ScheduleWorkoutProps {
  isOpen: boolean;
  closeOverlay: () => void;
}

export const MissionDetailsOverlay: React.FC<ScheduleWorkoutProps> = ({
  isOpen,
  closeOverlay,
  children,
}) => {
  return (
    <OverlayBackgroundLayer isOpen={isOpen} closeOverlay={closeOverlay}>
      {children}
    </OverlayBackgroundLayer>
  );
};
