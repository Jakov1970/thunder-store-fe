import { useRef, useState, useCallback, ChangeEvent } from "react";
import account from "../../assets/svg/account.svg";
import { logOutUser } from "../../store/actions/auth-actions";
import { useAppDispatch } from "../../hooks";
import { Popup, DropdownMenu } from "../";
import { StyledNavbar, Title, MenuIcon, NavFlexContainer } from "../../styles";
import { SearchAndFilter } from "../SearchAndFilter";
import {
  LOGOUT_CONFIRM,
  LOGOUT_DENY,
  LOGOUT_MESSAGE,
} from "../../utils/consts";

export interface NavbarPropType {
  inputsValue?: (value: string) => void;
}

export const Navbar = ({ inputsValue }: NavbarPropType) => {
  const [isLogoutButton, setIsLogoutButton] = useState(false);
  const [isUserClicked, setIsUserClicked] = useState(true);
  const dispatch = useAppDispatch();

  const dropdownRef = useRef<any>();

  const onClickDropdown = useCallback(() => {
    if (isUserClicked) {
      dropdownRef.current.style.display = "block";
    } else {
      dropdownRef.current.style.display = "none";
    }
    setIsUserClicked(!isUserClicked);
  }, [isUserClicked]);

  const disableDropdown = () => {
    setIsUserClicked(true);
    dropdownRef.current.style.display = "none";
  };

  const popoutHandler = () => {
    setIsLogoutButton(true);
  };

  const getClosingState = (state: boolean) => {
    setIsLogoutButton(state);
  };

  const logOut = () => {
    dispatch(logOutUser());
  };

  const getValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { target } = e;
    e.preventDefault();
    inputsValue && inputsValue(target.value);
  };

  return (
    <StyledNavbar>
      <Title
        onClick={() => {
          window.location.pathname = "/home";
        }}
      >
        Thunder Store
      </Title>
      {isLogoutButton && (
        <Popup
          content={LOGOUT_MESSAGE}
          getClosingState={getClosingState}
          actionTaken={logOut}
          popupConfirm={LOGOUT_CONFIRM}
          popupDeny={LOGOUT_DENY}
        />
      )}
      <NavFlexContainer>
        <SearchAndFilter inputValues={getValue} />
        <MenuIcon onClick={onClickDropdown}>
          <img src={account} alt="Menu" />
        </MenuIcon>
        <DropdownMenu
          popoutHandler={popoutHandler}
          disableDropdown={disableDropdown}
          ref={dropdownRef}
        />
      </NavFlexContainer>
    </StyledNavbar>
  );
};
