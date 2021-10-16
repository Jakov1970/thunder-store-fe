import { SingleFileState } from "./types/slice";
import { File } from "../components";
import { v4 as uuidv4 } from "uuid";
import {
  ASCENDING,
  DESCENDING,
  SORT_LETTER_A,
  SORT_LETTER_D,
  SORT_SIZE_A,
  SORT_SIZE_D,
} from "./consts";
import { ContextMenuItemProperties } from "./types/UserInterface";

export const getFileHandler = (
  submitRef: HTMLButtonElement,
  inputRef: HTMLInputElement,
  getFile: (fileList: Array<any>) => void
) => {
  const { files } = inputRef;
  submitRef.click();
  files && getFile(Object.values(files));
};
export const setFileList = (
  files: SingleFileState[] | undefined,
  displayType: string,
  toggleCheck: () => void,
  getOpeningState?: () => void,
  handleSelect?: (fileName: string, isChecked: boolean) => void,
  menuItemsSelection?: Array<ContextMenuItemProperties>
) =>
  files &&
  files.map(({ filename, extension }: SingleFileState) => {
    return (
      <File
        name={filename}
        extention={extension}
        key={uuidv4()}
        onSelect={handleSelect}
        displayType={displayType}
        toggleCheck={toggleCheck}
        menuItemsSelection={menuItemsSelection}
        getOpeningState={getOpeningState}
      />
    );
  });
export const calcProgressBar = (loaded: number, total: number) =>
  Math.round((loaded * 100) / total);

export const filterBySearch = (
  files: Array<SingleFileState>,
  value: string
) => {
  return value !== ""
    ? files.filter((file: SingleFileState) => {
        const { filename } = file;
        return filename.toLowerCase().includes(value.toLowerCase());
      })
    : files;
};

const sortByFirstLetter = (
  array: Array<SingleFileState>,
  typeOfSorting: string
) => {
  if (typeOfSorting === ASCENDING) {
    return array.sort((a, b) => a.filename.localeCompare(b.filename));
  }
  if (typeOfSorting === DESCENDING) {
    return array.sort((a, b) => b.filename.localeCompare(a.filename));
  }
};

const sortBySize = (array: Array<SingleFileState>, typeOfSorting: string) => {
  if (typeOfSorting === ASCENDING) {
    return array.sort((a, b) => Number(a.size) - Number(b.size));
  }
  if (typeOfSorting === DESCENDING) {
    return array.sort((a, b) => Number(b.size) - Number(a.size));
  }
};

export const sortByOptions = (files: Array<SingleFileState>, value: string) => {
  let sortedFiles = [...files];
  let setter: any = {
    [SORT_LETTER_A]: () => sortByFirstLetter(sortedFiles, ASCENDING),
    [SORT_LETTER_D]: () => sortByFirstLetter(sortedFiles, DESCENDING),
    [SORT_SIZE_A]: () => sortBySize(sortedFiles, ASCENDING),
    [SORT_SIZE_D]: () => sortBySize(sortedFiles, DESCENDING),
  };
  return setter[value];
};

export const filePathReducer = (previousValue: string, currentValue: string) =>
  `${previousValue}/${currentValue}`;

export const getCurrentTime = () => new Date().getTime();
