import styled from "styled-components";
import { ColorTheme } from "./colors";

const { menuColor, navColor } = ColorTheme;

export const StyledNavbar = styled.div`
  width: 100%;
  height: auto;
  background-color: ${navColor};
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  position: relative;
`;

export const Title = styled.h4`
  color: white;
  padding-left: 25px;
  width: 15%;
  margin: 0;
  cursor: pointer;
  user-select: none;
`;
export const MenuIcon = styled.div`
  box-sizing: border-box;
  width: 3em;
  height: 100%;
  background-color: inherit;
  padding: 0px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Menu = styled.div`
  width: 300px;
  height: auto;
  background-color: ${menuColor};
  position: absolute;
  display: none;
  top: 100%;
  right: 0px;
  z-index: 1;
`;

export const MenuItem = styled.div`
  color: white;
  width: 100%;
  height: auto;
  display: inherit;
  border-bottom: 1px solid black;
  padding: 5px 0px 5px 0px;
  text-align: center;
  cursor: pointer;
  &: hover {
    color: #68e4e4;
  }
`;

export const LinkStyle = {
  display: "block",
  textDecoration: "none",
  color: "inherit",
};

export const NavFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
`;
