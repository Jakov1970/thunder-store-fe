import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { LinkStyle, Menu, MenuItem } from "../../styles";
import { DropdownProps } from "../../utils/types/UserInterface";

export const DropdownMenu = forwardRef(
  ({ popoutHandler, disableDropdown }: DropdownProps, ref: any) => {
    return (
      <Menu ref={ref} onMouseLeave={disableDropdown}>
        <Link to="/userInfo" style={LinkStyle}>
          <MenuItem onClick={disableDropdown}>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={popoutHandler}>Logout</MenuItem>
      </Menu>
    );
  }
);
