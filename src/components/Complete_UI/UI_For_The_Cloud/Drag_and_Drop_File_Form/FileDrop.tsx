import { forwardRef, useRef } from "react";
import { FileDropdown } from "../../../../styles";
import { FileDropForm } from "./FileDropForm";
import { getFileHandler } from "../../../../utils/utility";
import { AddFileContainerProps } from "../../../../utils/types/UserInterface";

export const FileDrop = forwardRef(
  ({ getFile }: AddFileContainerProps, ref: any) => {
    const dropSubmitRef = useRef<HTMLButtonElement>(null);
    const dropInputRef = useRef<HTMLInputElement>(null);

    const addFileHandler = () => {
      const submit = dropSubmitRef.current;
      const input = dropInputRef.current;
      submit && input && getFileHandler(submit, input, getFile);
    };

    const hideDropdown = () => {
      ref.current.style.display = "none";
    };

    return (
      <FileDropdown ref={ref} onDragLeave={hideDropdown} onDrop={hideDropdown}>
        <FileDropForm
          submitRef={dropSubmitRef}
          inputRef={dropInputRef}
          parentChangeHandler={addFileHandler}
        />
      </FileDropdown>
    );
  }
);
