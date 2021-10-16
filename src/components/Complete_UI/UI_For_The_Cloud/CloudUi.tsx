import { FunctionComponent, useEffect, useRef, useState } from "react";
import { FileDrop } from "./";
import {
  CloudUiContainer,
  GridContainer,
  StyledInput,
  FileContainer,
} from "../../../styles";
import {
  createFolderAction,
  fileUploadAction,
  getFilesInfoAction,
} from "../../../store/actions/file-actions";
import { useAppDispatch, useAppSelector, useContextMenu } from "../../../hooks";
import { SingleFileState } from "../../../utils/types/slice";
import {
  filePathReducer,
  setFileList,
  sortByOptions,
} from "../../../utils/utility";
import { CloudUiPropsType } from "../../../utils/types/UserInterface";
import { PreviewModal } from "../../Modal";
import { filePathBack } from "../../../store";
import { Popup } from "../Popup";
import { CANCEL, CREATE_FOLDER } from "../../../utils/consts";
import { SortInfoContainer } from "../../SortInfoContainer";
import { VscArrowLeft } from "react-icons/vsc";
import { ContextMenu } from "../..";

export const CloudUi: FunctionComponent<CloudUiPropsType> = ({
  uiState,
  filteredFiles,
  toggleCheck,
}) => {
  const [data, setData] = useState<Array<SingleFileState>>([]);
  const [creatingFolder, setCreatingFolder] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>("");
  const {
    files: fileList,
    showModal,
    filePath,
  } = useAppSelector((state) => state.file);
  const [filteredFileList, setFilteredFileList] = useState<SingleFileState[]>(
    filteredFiles ? filteredFiles : []
  );

  const dropdownRef = useRef<any>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    filteredFiles && setFilteredFileList(filteredFiles);
  }, [filteredFiles]);

  useEffect(() => {
    setData(fileList);
    setData(filteredFileList.length ? filteredFileList : fileList);
  }, [filteredFileList, fileList]);

  const setFiles = (file: Array<SingleFileState>) => {
    let bucket = filePath[1] ? filePath[1] : "";
    dispatch(
      fileUploadAction({
        folderPath: filePath.reduce(filePathReducer),
        files: file,
        bucket,
      })
    );
  };
  const handleClickBack = () => {
    const filePathTmp = [...filePath];
    if (filePathTmp.length > 1) {
      dispatch(filePathBack());
      filePathTmp.pop();
      dispatch(
        getFilesInfoAction({
          folderPath: filePathTmp.reduce(filePathReducer),
        })
      );
    }
  };

  const setOpeningState = () => {
    setCreatingFolder(true);
  };

  const setClosingState = () => {
    setCreatingFolder(false);
  };

  const setSortValue = (value: string) => {
    setFilteredFileList(sortByOptions(fileList, value));
  };

  const handleChange = (event: any) => setFolderName(event.target.value);

  const handleCreateFolder = () => {
    if (filePath.length > 1) {
      const bucket = filePath[1];
      const filePathTmp = [...filePath];
      filePathTmp.push(folderName);
      const folder = filePath.reduce(filePathReducer);
      dispatch(
        createFolderAction(filePathTmp.reduce(filePathReducer), bucket, folder)
      );
    }
  };

  const showDropdown = () =>
    dropdownRef.current ? (dropdownRef.current.style.display = "block") : null;
  return (
    <CloudUiContainer>
      <SortInfoContainer setSortValue={setSortValue} />
      <GridContainer onDragEnter={showDropdown} displayType={uiState}>
        <FileContainer
          displayType={uiState}
          selected={"idle"}
          onDoubleClick={handleClickBack}
        >
          <VscArrowLeft />
        </FileContainer>
        {creatingFolder && (
          <Popup
            content={<StyledInput type={"text"} onChange={handleChange} />}
            getClosingState={setClosingState}
            actionTaken={handleCreateFolder}
            popupConfirm={CREATE_FOLDER}
            popupDeny={CANCEL}
          />
        )}
        {showModal && <PreviewModal />}
        {setFileList(data, uiState, toggleCheck, setOpeningState)}
        <FileDrop getFile={setFiles} ref={dropdownRef} displayType={uiState} />
      </GridContainer>
    </CloudUiContainer>
  );
};
