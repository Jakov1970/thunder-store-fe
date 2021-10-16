import { ContextContainer } from "../styles/ContextMenuStyles";
import { MenuItem } from "../styles/NavbarStyle";
import { ContextMenuProperties } from "../utils/types/UserInterface";

export const ContextMenu = ({
  position: { left, top },
  MenuItems,
}: ContextMenuProperties) => {
  return (
    <ContextContainer top={top} left={left}>
      {MenuItems &&
        MenuItems.map(({ handleClick, buttonText }, key) => (
          <MenuItem onClick={handleClick} key={key}>
            {buttonText}
          </MenuItem>
        ))}
    </ContextContainer>
  );
};
