import { forwardRef } from "react";
import { SubmitButton, FileInput, DropForm } from "../../../../styles";
import { TYPE_SUBMIT } from "../../../../utils/buttonTypes";
import { FileFormSubmitHandler } from "../../../../utils/functions/UserInterface";
import { FileFormProps } from "../../../../utils/types/UserInterface";

export const FileDropForm = forwardRef(
  ({ submitRef, inputRef, parentChangeHandler }: FileFormProps) => (
    <DropForm onSubmit={FileFormSubmitHandler}>
      <FileInput type="file" ref={inputRef} onChange={parentChangeHandler} />
      <SubmitButton type={TYPE_SUBMIT} ref={submitRef}></SubmitButton>
    </DropForm>
  )
);
