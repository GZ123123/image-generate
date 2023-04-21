import { useCallback, useState } from "react";

export const useToggle = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen]);

  const close = useCallback(() => setOpen(false), []);

  const open = useCallback(() => setOpen(true), []);

  return { isOpen, toggle, close, open };
};
