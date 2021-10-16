import styled from "styled-components";
import { ColorTheme } from "./colors";
import { prop } from "styled-tools";

const { menuColor } = ColorTheme;

export const ContextContainer = styled.div<any>`
  padding: 0px 10px;
  width: auto;
  min-width: 150px;
  position: absolute;
  height: auto;
  z-index: 300;
  background-color: ${menuColor};
  top: ${prop<string>("top")}px;
  left: ${prop<string>("left")}px;
`;
