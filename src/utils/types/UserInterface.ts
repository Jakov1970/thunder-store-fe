import { ChangeEvent, FormEvent, ForwardedRef, ReactElement } from "react";
import { JsxElement } from "typescript";
import { SingleFileState } from "./slice";

export interface FileFormProps {
  submitRef: ForwardedRef<HTMLButtonElement> | undefined;
  inputRef: ForwardedRef<HTMLInputElement> | undefined;
  parentChangeHandler: () => any;
}

export interface AddFileContainerProps {
  getFile: (file: Array<SingleFileState>) => void;
  displayType?: string;
}

export interface FileProperties {
  name: string;
  extention: string | undefined;
  onSelect?: (fileName: string, isSelected: boolean) => any;
  displayType: string;
  toggleCheck: () => void;
  menuItemsSelection?: Array<ContextMenuItemProperties>;
  getOpeningState?: () => void;
}

export interface DropdownProps {
  popoutHandler: () => void;
  disableDropdown: () => void;
}

export interface PopupProps {
  content: any;
  getClosingState: (state: boolean) => void;
  actionTaken: (value?: string) => void;
  popupConfirm: string;
  popupDeny: string;
}

export interface InputProps {
  info: {
    name: string;
    type: string;
  };
  getValueHandler: (value: string, name: string) => any;
}

export interface AuthFormProps {
  onSubmit: (event: FormEvent) => void;
  onChange: (value: string, name: string) => any;
  onSuccess?: (response: any) => void;
  messages?: (inputName: string) => string | null;
}

export interface Setters {
  setName?: (name: string) => void;
  setSurname?: (name: string) => void;
  setEmail: (name: string) => void;
  setPassword: (name: string) => void;
  setConfirmPassword?: (name: string) => void;
}

export interface ContextMenuItemProperties {
  handleClick: (() => void) | undefined | ((event: any) => void);
  buttonText: string;
}

export interface ContextMenuProperties {
  position: {
    top: number;
    left: number;
  };
  MenuItems: Array<ContextMenuItemProperties> | undefined;
}

export interface GridContainerProperties {
  displayType: string | undefined;
}

export interface SidebarPropsType {
  isSelect?: boolean;
  uiState?: boolean;
  handleDownloadSelected?: () => void;
  handleDeleteSelected?: () => void;
  changeSelect?: () => void;
  changeUiState?: () => void;
}

export interface CloudUiPropsType {
  getSelected?: (selected: Array<string>) => void;
  uiState: string;
  filteredFiles: Array<SingleFileState> | undefined;
  toggleCheck: () => void;
  handleDownloadSelected?: () => void;
  handleDeleteSelected?: () => void;
}

export interface CheckFilesPropsType extends CloudUiPropsType {
  handleDownloadSelected: () => void;
  handleDeleteSelected: () => void;
  getSelected: (selected: Array<string>) => void;
}

export interface ListElementType {
  content: ReactElement | string;
  onClick: (() => any) | undefined;
}

export interface FileContainerProperties {
  displayType: string | undefined;
  selected: string;
}

export interface SearchAndFilterPropsType {
  inputValues: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => any;
}

export interface OptionInfoType {
  value: string;
  text: string;
}
