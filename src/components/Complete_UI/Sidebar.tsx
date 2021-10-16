import { Container, UList, FlexContainer, StyledInput } from "../../styles";
import {
  CANCEL,
  DELETE_SELECTED_BUTTON_TEXT,
  DOWNLOAD_SELECTED_BUTTON_TEXT,
  GRID_VIEW,
  LIST_VIEW,
  SELECTION_BUTTON_TEXT,
  SELECTION_QUIT_BUTTON_TEXT,
  SidebarData,
} from "../../utils/consts";
import { v4 as uuidv4 } from "uuid";
import { FunctionComponent, useState } from "react";
import { SidebarPropsType } from "../../utils/types/UserInterface";
import { ListElement } from "./ListElement";
import { AddFileContainer, Popup } from "..";
import {
  createOrganizationAction,
  createUserAction,
  fileUploadAction,
} from "../../store";
import { SingleFileState } from "../../utils/types/slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { HiOutlineUserGroup, HiOutlineUserAdd } from "react-icons/hi";
import { BsGrid3X2Gap, BsViewList } from "react-icons/bs";
import { add } from "lodash";
import { filePathReducer } from "../../utils/utility";

export const Sidebar: FunctionComponent<SidebarPropsType> = ({
  isSelect,
  uiState,
  handleDownloadSelected,
  handleDeleteSelected,
  changeSelect,
  changeUiState,
}) => {
  const [organisation, setOrganisation] = useState<boolean>(false);
  const [addUserOrg, setAddUserOrg] = useState<boolean>(false);
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationDescription, setOrganizationDescription] =
    useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const dispatch = useAppDispatch();
  const { name: userName, surname: userSurname } = useAppSelector(
    (state) => state.user
  );
  const {
    files: fileList,
    showModal,
    filePath,
  } = useAppSelector((state) => state.file);

  const displayTypeButton = uiState ? (
    <>
      <BsGrid3X2Gap />
      {GRID_VIEW}
    </>
  ) : (
    <>
      <BsViewList />
      {LIST_VIEW}
    </>
  );

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

  const handleChangeOrgName = (event: any) =>
    setOrganizationName(event.target.value);

  const handleChangeOrgDescr = (event: any) =>
    setOrganizationDescription(event.target.value);

  const setClosingStateOrg = () => {
    setOrganisation(false);
  };

  const handleCreateOrg = () => {
    dispatch(
      createOrganizationAction({
        organizationName,
        organizationDescription,
      })
    );
  };

  const handleChangeAddUserOrg = (event: any) =>
    setUserEmail(event.target.value);

  const setClosingStateAddUser = () => {
    setAddUserOrg(false);
  };

  const handleAddUserOrg = () => {
    dispatch(
      createUserAction({
        data: userEmail,
      })
    );
  };

  return (
    <Container>
      <AddFileContainer getFile={setFiles} />
      <UList>
        <ListElement
          key={uuidv4()}
          content={
            <>
              <HiOutlineUserAdd size={"25px"} />
              Add User
            </>
          }
          onClick={() => {
            setAddUserOrg(true);
          }}
        />
        <ListElement
          key={uuidv4()}
          content={
            <>
              <HiOutlineUserGroup size={"25px"} />
              Organisation
            </>
          }
          onClick={() => {
            setOrganisation(true);
          }}
        />
        <ListElement
          key={uuidv4()}
          content={displayTypeButton}
          onClick={changeUiState}
        />
      </UList>
      {organisation && (
        <Popup
          content={
            <>
              <StyledInput
                type={"text"}
                onChange={handleChangeOrgName}
                placeholder={"Organisation Name"}
              />
              <StyledInput
                type={"text"}
                onChange={handleChangeOrgDescr}
                placeholder={"Organisation Description"}
              />
            </>
          }
          getClosingState={setClosingStateOrg}
          actionTaken={handleCreateOrg}
          popupConfirm={"Submit"}
          popupDeny={CANCEL}
        />
      )}
      {addUserOrg && (
        <Popup
          content={
            <StyledInput
              type={"text"}
              onChange={handleChangeAddUserOrg}
              placeholder={"Enter User Email"}
            />
          }
          getClosingState={setClosingStateAddUser}
          actionTaken={handleAddUserOrg}
          popupConfirm={"Add User"}
          popupDeny={CANCEL}
        />
      )}
    </Container>
  );
};
