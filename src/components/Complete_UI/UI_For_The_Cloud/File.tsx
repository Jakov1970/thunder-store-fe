import {
  ForwardedRef,
  forwardRef,
  SyntheticEvent,
  useEffect,
  useState,
  FunctionComponent,
} from "react";
import { useAppSelector, useContextMenu } from "../../../hooks";
import { FileContainer, ImageContainer, Img } from "../../../styles";
import { VscFile, VscFolder } from "react-icons/vsc";
import {
  ContextMenuItemProperties,
  FileProperties,
} from "../../../utils/types/UserInterface";
import { ContextMenu } from "../../";
import { useDispatch } from "react-redux";
import {
  deleteFileAction,
  downloadFileAction,
  getFilesInfoAction,
  previewFileAction,
} from "../../../store/actions/file-actions";
import {
  DOWNLOAD_BUTTON_TEXT,
  DELETE_BUTTON_TEXT,
  CLASS_IDLE,
  CLASS_SELECTED,
  SELECTION_BUTTON_TEXT,
  CREATE_FOLDER,
} from "../../../utils/consts";
import useToggle from "../../../hooks/useToggle";
import { filePathNext } from "../../../store";
import { filePathReducer } from "../../../utils/utility";

export const File: FunctionComponent<FileProperties> = forwardRef(
  (
    {
      name,
      extention,
      onSelect,
      displayType,
      toggleCheck,
      menuItemsSelection,
      getOpeningState,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const dispatch = useDispatch();

    const { filePath } = useAppSelector((state) => state.file);
    const { show, handleContextClose, handleContextMenu, anchorPoint } =
      useContextMenu();
    const [isSelected, toggleSelected] = useToggle();

    const checkType = (type: string | undefined) => type === "folder";

    const checkFileType = (type: string | undefined) =>
      checkType(type) ? <VscFolder size={"35px"} /> : <VscFile size={"35px"} />;

    const handleDownload = () => {
      if (extention !== "folder") {
        dispatch(
          downloadFileAction({
            folderPath: filePath.reduce(filePathReducer),
            file: name,
          })
        );
      } else {
        handlePreview();
      }
    };

    const handleDelete = () => {
      if (extention !== "folder") {
        const bucket = filePath[1];
        dispatch(
          deleteFileAction({
            folderPath: filePath.reduce(filePathReducer),
            files: [name],
            bucket,
          })
        );
      }
    };

    const handlePreview = () => {
      if (extention !== "folder") {
        dispatch(
          previewFileAction({
            folderPath: filePath.reduce(filePathReducer),
            file: name,
          })
        );
      }
    };

    const handleDoubleClick = () => {
      if (checkType(extention)) {
        dispatch(filePathNext(name));
        dispatch(
          getFilesInfoAction({
            folderPath: filePath.reduce(filePathReducer) + `/${name}`,
          })
        );
      } else {
        handlePreview();
      }
    };

    const handleSelected = () => (isSelected ? CLASS_SELECTED : CLASS_IDLE);

    const handleClick = (event: SyntheticEvent) => {
      event.preventDefault();
      if (onSelect) {
        toggleSelected();
        onSelect(name, isSelected);
      }
      handleContextClose();
    };

    const menuItemsIdle: Array<ContextMenuItemProperties> = [
      {
        handleClick: handleDownload,
        buttonText: DOWNLOAD_BUTTON_TEXT,
      },
      {
        handleClick: handleDelete,
        buttonText: DELETE_BUTTON_TEXT,
      },
      {
        handleClick: toggleCheck,
        buttonText: SELECTION_BUTTON_TEXT,
      },
      {
        handleClick: getOpeningState,
        buttonText: CREATE_FOLDER,
      },
    ];

    const menuItems =
      menuItemsSelection && onSelect ? menuItemsSelection : menuItemsIdle;

    return (
      <FileContainer
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onMouseLeave={handleContextClose}
        ref={ref}
        displayType={displayType}
        selected={handleSelected()}
      >
        {show && <ContextMenu position={anchorPoint} MenuItems={menuItems} />}
        <ImageContainer>{checkFileType(extention)}</ImageContainer>
        <p>{name}</p>
      </FileContainer>
    );
  }
);
