import { AddFileContainerStyle, ImageContainer, Img } from "../../../../styles";
import plus from "../../../../assets/svg/Plus.svg";
import { FileForm } from "./FileForm";
import { useRef } from "react";
import { getFileHandler } from "../../../../utils/utility";
import { AddFileContainerProps } from "../../../../utils/types/UserInterface";
import { VscCloudUpload } from "react-icons/vsc";

export const AddFileContainer = ({
  getFile,
  displayType,
}: AddFileContainerProps) => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activateForm = () => {
    let input = inputRef.current;
    if (input) {
      input.click();
    }
  };

  const addFileHandler = () => {
    let submit = submitRef.current;
    let input = inputRef.current;
    submit && input && getFileHandler(submit, input, getFile);
  };

  return (
    <AddFileContainerStyle onClick={activateForm} displayType={displayType}>
      <FileForm
        parentChangeHandler={addFileHandler}
        submitRef={submitRef}
        inputRef={inputRef}
      />
      <ImageContainer>
        <VscCloudUpload size={"40px"} />
      </ImageContainer>
      <p>Add File</p>
    </AddFileContainerStyle>
  );
};
