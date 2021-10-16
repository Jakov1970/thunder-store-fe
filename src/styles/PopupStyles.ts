import styled from "styled-components";
import { ColorTheme } from "./colors";

const { otherBackColor, textColor, menuColor, navColor } = ColorTheme;

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #00000040;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${textColor};
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 300;
  text-align: center;
`;

export const Modal = styled.div`
  box-sizing: border-box;
  width: 40%;
  height: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${navColor};
  border: 3px solid ${menuColor};
  border-radius: 10px;
  z-index: 301;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const PopupButtons = styled.button`
  margin: 20px 0;
  margin-top: 10px;
  background-color: white;
  border: none;
  border-radius: 10px;
  min-width: 100px;
  color: black;
  transition: background-color 0.2s ease-out;
  &: hover {
    background-color: lightgray;
  }
`;
