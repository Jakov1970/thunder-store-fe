import styled from "styled-components";
import { ColorTheme } from "./colors";

const { menuColor, textColor, buttonColor } = ColorTheme;

export const AuthFormContainer = styled.form`
  width: 20em;
  height: auto;
  padding: 40px 20px;
  background-color: ${menuColor};
  color: ${textColor};
  border: 1px solid ${menuColor};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 20px;
`;

export const AuthFormButton = styled.button`
  margin-top: 20px;
  padding: 5px 0px;
  width: 100%;
  background-color: ${buttonColor};
  border: none;
  border-radius: 5px;
  color: ${textColor};
`;

export const AuthFlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
