import { createGlobalStyle } from "styled-components";
import { ColorTheme } from "./colors";

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: ${ColorTheme.textColor};
        font-family: Trebuchet MS, Lucida Sans Unicode, Lucida Grande, Lucida Sans,
        Arial, sans-serif;
        font-size: 1.5em;
        box-sizing: border-box;
    }
`;
