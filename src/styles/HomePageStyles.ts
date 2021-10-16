import styled, { css } from "styled-components";
import { prop, switchProp } from "styled-tools";
import { GridContainerProperties } from "../utils/types/UserInterface";

export const MainDiv = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 64px);
`;

export const GridContainer = styled.div<GridContainerProperties>`
  display: grid;
  ${switchProp(prop("displayType"), {
    grid: css`
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-auto-rows: 0.1fr;
    `,
    list: css`
      grid-auto-rows: 0.1fr;
      grid-template-column: 100%;
    `,
  })}
  gap: 15px;
  width: 100%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: light-gray;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export const FileDropdown = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: none;
`;

export const CloudUiContainer = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
