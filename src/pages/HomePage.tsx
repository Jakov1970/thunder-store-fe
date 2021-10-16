import { useEffect, useState } from "react";
import {
  Navbar,
  Sidebar,
  CloudUi,
  SpinnerContainer,
  CheckManyFiles,
} from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import useToggle from "../hooks/useToggle";
import {
  deleteFileAction,
  downloadFileAction,
  downloadZipFileAction,
  getFilesInfoAction,
  userInfoAction,
} from "../store/actions";
import { MainDiv, Section } from "../styles";
import {
  SORT_LETTER_A,
  SORT_LETTER_D,
  SORT_SIZE_A,
  SORT_SIZE_D,
} from "../utils/consts";
import { SingleFileState } from "../utils/types/slice";
import {
  filePathReducer,
  filterBySearch,
  sortByOptions,
} from "../utils/utility";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const [isCheck, toggleCheck] = useToggle();
  const { accessToken } = useAppSelector((state) => state.auth);
  const [uiState, toggleUiState] = useToggle(true);
  const [uiStateValue, setUiStateValue] = useState("list");
  const { files, filePath } = useAppSelector((state) => state.file);
  const [fileData, setFileData] = useState<Array<SingleFileState> | undefined>(
    files
  );
  const { notificationLoading } = useAppSelector((state) => state.ui);
  const { name: userName, surname: userSurname } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(userInfoAction(accessToken));
  }, []);

  useEffect(() => {
    setUiStateValue(uiState ? "list" : "grid");
  }, [uiState]);

  useEffect(() => {
    if (userName !== "" && userSurname !== "") {
      dispatch(
        getFilesInfoAction({
          folderPath: filePath.reduce(filePathReducer),
        })
      );
    }
  }, [userName, userSurname]);

  let selected: Array<string> = [];

  const getSelected = (array: Array<string>) => {
    selected = array;
  };

  const handleDownload = () => {
    dispatch(
      downloadZipFileAction({
        files: selected,
        folderPath: filePath.reduce(filePathReducer),
      })
    );
  };

  const handleDelete = () => {
    const bucket = filePath[1];
    dispatch(
      deleteFileAction({
        folderPath: filePath.reduce(filePathReducer),
        files: selected,
        bucket,
      })
    );
  };

  const handleSearchChange = (value: string) => {
    const fileList = files;
    setFileData(filterBySearch(fileList, value));
  };

  return (
    <MainDiv>
      <Navbar inputsValue={handleSearchChange} />
      <Section>
        <Sidebar
          isSelect={isCheck}
          uiState={uiState}
          handleDownloadSelected={handleDownload}
          handleDeleteSelected={handleDelete}
          changeSelect={toggleCheck}
          changeUiState={toggleUiState}
        />
        {notificationLoading ? (
          <SpinnerContainer />
        ) : isCheck ? (
          <CheckManyFiles
            getSelected={getSelected}
            uiState={uiStateValue}
            handleDownloadSelected={handleDownload}
            handleDeleteSelected={handleDelete}
            filteredFiles={fileData}
            toggleCheck={toggleCheck}
          />
        ) : (
          <CloudUi
            uiState={uiStateValue}
            filteredFiles={fileData}
            toggleCheck={toggleCheck}
          />
        )}
      </Section>
    </MainDiv>
  );
};
