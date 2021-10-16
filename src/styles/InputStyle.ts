import styled from "styled-components";
import { ifProp } from "styled-tools";

export const StyledInput = styled.input`
  width: 100%;
  margin-top: ${ifProp({ placeholder: "Search" }, 0, 30)}px;
  background-color: white;
  height: auto;
  border: ${ifProp({ placeholder: "Search" }, "none", "2px solid gray")};
  color: gray;
  border-radius: 5px;
  text-indent: 5px;
`;

export const InputContainer = styled.div`
  width: 100%;
`;
