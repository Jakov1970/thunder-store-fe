import styled from "styled-components";

export const SubmitButton = styled.button`
  display: none;
`;

export const FileInput = styled.input`
  &::file-selector-button {
    box-sizing: border-box;
    margin: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    border: 5px dashed gray;
    background-color: light-gray;
    opacity: 0.3;
  }
  width: 100%;
  height: 100%;
`;

export const DropForm = styled.form`
  width: 100%;
  height: 100%;
`;
