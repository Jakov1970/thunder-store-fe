import { useState, useCallback, SetStateAction } from "react";

type ToggleStateAction = (value?: SetStateAction<boolean>) => void;

export default function useToggle(
  initialState?: boolean | (() => boolean)
): [boolean, ToggleStateAction] {
  const [state, setState] = useState<boolean>(initialState ?? false);
  const toggle = useCallback(() => {
    setState((previousState) => !previousState);
  }, []);
  return [state, toggle];
}
