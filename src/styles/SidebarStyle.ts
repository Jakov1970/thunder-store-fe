import styled from "styled-components";
import { ColorTheme } from "./colors";

const { menuColor } = ColorTheme;

export const Container = styled.div`
  width: 15%;
  height: 100%;
  background-color: inherit;
  border-right: 1px solid lightgray;
`;

export const UList = styled.ul`
  height: 100%;
  width: 100%;
  padding: 0;
`;

export const ListElementContainer = styled.li`
  cursor: pointer;
  width: 100%;
  padding-left: 20px;
  height: 60px;
  list-style-type: none;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-top: 10px;
  display: flex;
  color: black;
  justify-content: flex-start;
  gap: 10px;
  border-radius-right: 50%;
  align-items: center;
  font-size: 20px;
  transition: background-color 0.2s ease-out;
  user-select: none;
  &:hover {
    background-color: lightgray;
  }
`;
