import { FunctionComponent, useEffect, useState } from "react";
import { AddFileContainer, File } from "./";
import { GridContainer } from "../../../styles";
import { useAppSelector } from "../../../hooks";
import {
  CheckFilesPropsType,
  ContextMenuItemProperties,
} from "../../../utils/types/UserInterface";
import { SingleFileState } from "../../../utils/types/slice";
import { setFileList } from "../../../utils/utility";
import {
  DOWNLOAD_SELECTED_BUTTON_TEXT,
  DELETE_SELECTED_BUTTON_TEXT,
  SELECTION_QUIT_BUTTON_TEXT,
} from "../../../utils/consts";

export const CheckManyFiles: FunctionComponent<CheckFilesPropsType> = ({
  getSelected,
  uiState,
  filteredFiles,
  toggleCheck,
  handleDownloadSelected,
  handleDeleteSelected,
}) => {
  const { files: fileList } = useAppSelector((state) => state.file);
  const [data, setData] = useState<Array<SingleFileState>>([]);
  let selectedFiles: Array<string> = [];

  useEffect(() => {
    filteredFiles && setData(filteredFiles.length ? filteredFiles : fileList);
  }, [filteredFiles]);

  const handleSelect = (fileName: string, isChecked: boolean) => {
    if (isChecked) {
      selectedFiles = selectedFiles.filter((file) => file !== fileName);
    } else {
      selectedFiles.push(fileName);
    }
    getSelected(selectedFiles);
  };

  const menuItems: Array<ContextMenuItemProperties> = [
    {
      handleClick: handleDownloadSelected,
      buttonText: DOWNLOAD_SELECTED_BUTTON_TEXT,
    },
    {
      handleClick: handleDeleteSelected,
      buttonText: DELETE_SELECTED_BUTTON_TEXT,
    },
    {
      handleClick: toggleCheck,
      buttonText: SELECTION_QUIT_BUTTON_TEXT,
    },
  ];

  return (
    <GridContainer displayType={uiState}>
      {setFileList(
        data,
        uiState,
        toggleCheck,
        undefined,
        handleSelect,
        menuItems
      )}
    </GridContainer>
  );
};
