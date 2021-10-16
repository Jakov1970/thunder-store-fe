import styled, { css } from "styled-components";
import {
  FileContainerProperties,
  GridContainerProperties,
} from "../utils/types/UserInterface";
import { ColorTheme } from "./colors";
import { prop, switchProp } from "styled-tools";

const { otherBackColor, textColor } = ColorTheme;

export const HiddenForm = styled.form`
  display: none;
`;

export const FileContainer = styled.div<FileContainerProperties>`
  border-radius: 10px;
  border-bottom: 1px solid lightgray;
  ${switchProp(prop("selected"), {
    selected: css`
      background-color: ${otherBackColor};
    `,
    idle: css`
      background-color: ${textColor};
    `,
  })}
  width: 100%;
  ${switchProp(prop("displayType"), {
    grid: css`
      max-width: 310px;
    `,
    list: css``,
  })}
  display: flex;
  gap: 20px;
  transition: background 0.1s;
  ${switchProp(prop("displayType"), {
    grid: css`
      height: 100px;
    `,
    list: css`
      height: auto;
    `,
  })}
  justify-content: flex-start;
  padding: 0px 15px;
  align-items: center;
  cursor: pointer;
  position: relative;
  &: hover {
    background-color: lightgray;
  }
  & > p {
    margin: auto 0px;
    max-width: 250px;
    max-height: 100%;
    overflow: hidden;
    white-space: no-wrap;
    text-overflow: ellipsis;
    user-select: none;
    position: relative;
    pointer-events: none;
  }
`;

export const AddFileContainerStyle = styled.div<GridContainerProperties>`
  border-radius: 30px;
  background-color: ${textColor};
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  height: auto;
  width: 70%;
  padding: 10px;
  margin: 20px auto auto auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
  transition: background 0.1s;
  user-select: none;
  & > p {
    margin: auto 0;
  }
  &: hover {
    background-color: lightgray;
  }
`;

export const ImageContainer = styled.div`
  width: auto;
  user-select: none;
  pointer-events: none;
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;
`;
