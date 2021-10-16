import { forwardRef } from "react";
import { FileFormProps } from "../../../../utils/types/UserInterface";
import { HiddenForm } from "../../../../styles";
import { FileFormSubmitHandler } from "../../../../utils/functions/UserInterface";
import { TYPE_SUBMIT } from "../../../../utils/buttonTypes";

export const FileForm = forwardRef(
  ({ parentChangeHandler, submitRef, inputRef }: FileFormProps) => (
    <HiddenForm onSubmit={FileFormSubmitHandler}>
      <input
        type="file"
        onChange={parentChangeHandler}
        multiple
        ref={inputRef}
      />
      <button type={TYPE_SUBMIT} ref={submitRef} />
    </HiddenForm>
  )
);
