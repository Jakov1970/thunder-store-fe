import styled from "styled-components";
import { ifProp } from "styled-tools";
import { ColorTheme } from "./colors";

interface flexContainerPropsType {
  search?: boolean;
  spinner?: boolean;
}

const { buttonColor, textColor } = ColorTheme;

export const ErrorMessage = styled.p`
  color: red;
  font-family: sans-serif;
  height: 20px;
  font-size: 12px;
  margin: -20px 0 -30px 0;
`;
export const StyledButton = styled.button`
  margin: 20px 0;
  margin-top: 10px;
  background-color: ${buttonColor};
  border: none;
  border-radius: 10px;
  min-width: 100px;
  padding: 10px 0px 10px 0px;
  color: ${textColor};
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexContainer = styled.div<flexContainerPropsType>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${ifProp("search", "600px", "85%")};
  gap: ${ifProp("search", 20, 0)}px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SortContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid lightgray;
`;

export const SortContainerElement = styled.div`
  width: 100%;
  padding-left: 10px;
  border-right: 1px solid lightgray;
  text-align: left;
  color: lightgray;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const SearchLabel = styled.label`
  background: white;
`;
