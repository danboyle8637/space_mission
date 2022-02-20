import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const portalDiv = useRef<Element | null>(null);

  useEffect(() => {
    portalDiv.current = document.getElementById("portal");
    setMounted(true);
  }, []);

  return mounted && portalDiv.current
    ? createPortal(children, portalDiv.current)
    : null;
};
