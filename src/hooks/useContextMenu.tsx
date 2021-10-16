import { useState, useCallback, MouseEvent } from "react";

export const useContextMenu = () => {
  const [anchorPoint, setAnchorPoint] = useState({ left: 0, top: 0 });
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const { nativeEvent } = event;
      const { offsetX, offsetY } = nativeEvent;
      setAnchorPoint({
        left: offsetX,
        top: offsetY,
      });
      setShow(true);
    },
    [setAnchorPoint, setShow]
  );

  const handleContextClose = () => {
    setShow(false);
  };

  return {
    show,
    anchorPoint,
    handleContextMenu,
    handleContextClose,
  };
};
